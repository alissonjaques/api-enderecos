import Pessoa from '../typeorm/entidades/Pessoa';
import ServicoListarPessoas from './ServicoListarPessoas';
import { getCustomRepository } from 'typeorm';
import ValidacoesAtualizar from '../validacoes/put/ValidacoesAtualizar';
import existePessoa from '../validacoes/delete/existePessoa';
import AppErros from '@compartilhado/erros/AppErros';
import { RepositorioPessoa } from '../typeorm/repositorios/RepositorioPessoa';
import Endereco from '@modules/enderecos/typeorm/entidades/Endereco';
import ServicoAtualizarEnderecos from '@modules/enderecos/servicos/ServicoAtualizarEnderecos';
import { RepositorioEndereco } from '@modules/enderecos/typeorm/repositorios/RepositorioEndereco';
import ServicoDeletarEndereco from '@modules/enderecos/servicos/ServicoDeletarEnderecos';
import ServicoCriarEnderecos from '@modules/enderecos/servicos/ServicoCriarEnderecos';
import validarCodigoPessoaEnderecosInclusao from '../validacoes/geral/validarCodigoPessoaEnderecosInclusao';

interface IRequest {
  codigoPessoa: number;
  nome: string;
  sobrenome: string;
  idade: number;
  login: string;
  senha: string;
  status: number;
  enderecos: Endereco[];
}

class ServicoAtualizarPessoa {
  public async executa({
    codigoPessoa,
    nome,
    sobrenome,
    idade,
    login,
    senha,
    status,
    enderecos,
  }: IRequest): Promise<Pessoa[]> {
    const repositorioPessoa = getCustomRepository(RepositorioPessoa);

    if (!codigoPessoa) {
      throw new AppErros(
        `Não foi possível atualizar a pessoa no banco de dados.<br>Motivo: o campo codigoPessoa é obrigatório`,
      );
    }

    const pessoa = await existePessoa(
      codigoPessoa,
      repositorioPessoa,
      'atualizar',
    );

    const validacoes = new ValidacoesAtualizar();
    await validacoes.validar(
      { codigoPessoa, nome, sobrenome, idade, login, senha, status, enderecos },
      pessoa,
    );

    await this.ajustarEnderecosPessoa(codigoPessoa, enderecos);

    pessoa.nome = nome;
    pessoa.sobrenome = sobrenome;
    pessoa.idade = idade;
    pessoa.login = login;
    pessoa.senha = senha;
    pessoa.status = status;

    await repositorioPessoa.save(pessoa);

    const servicoListarPessoas = new ServicoListarPessoas();
    return await servicoListarPessoas.executa();
  }

  private async ajustarEnderecosPessoa(
    codigoPessoa: number,
    enderecos: Endereco[],
  ): Promise<void> {
    const servicoCriarEnderecos = new ServicoCriarEnderecos();
    const servicoAtualizarEnderecos = new ServicoAtualizarEnderecos();
    const repositorioEndereco = getCustomRepository(RepositorioEndereco);

    const enderecosDaPessoaCadastrados =
      await repositorioEndereco.encontrarPorCodigoPessoa(codigoPessoa);

    const enderecosParaDelecaoOuAtualizacao = enderecos.filter(
      endereco => endereco.codigoEndereco,
    );

    // lista para inclusão
    const enderecosParaInclusao = enderecos.filter(
      endereco => !endereco.codigoEndereco,
    );

    // lista para deleção
    const enderecosParaExclusao = this.obterRegistrosCadastradosParaExclusao(
      enderecosDaPessoaCadastrados,
      enderecosParaDelecaoOuAtualizacao,
    );

    // lista para atualização
    const enderecosParaAtualizacao =
      this.obterRegistrosCadastradosParaAtualizacao(
        enderecosDaPessoaCadastrados,
        enderecosParaDelecaoOuAtualizacao,
      );

    // validações
    if (Object.keys(enderecosParaInclusao).length !== 0) {
      validarCodigoPessoaEnderecosInclusao(enderecos, codigoPessoa);
      await servicoCriarEnderecos.validarEnderecos(
        {
          enderecos: enderecosParaInclusao,
        },
        true,
      );
    }

    if (Object.keys(enderecosParaDelecaoOuAtualizacao).length !== 0) {
      await servicoAtualizarEnderecos.validarEnderecos(
        {
          enderecos: enderecosParaDelecaoOuAtualizacao,
        },
        codigoPessoa,
      );
    }

    // transações
    if (Object.keys(enderecosParaExclusao).length !== 0) {
      const servicoDeletarEnderecos = new ServicoDeletarEndereco();
      await servicoDeletarEnderecos.execute({
        enderecos: enderecosParaExclusao,
      });
    }

    if (Object.keys(enderecosParaAtualizacao).length !== 0) {
      await servicoAtualizarEnderecos.executa({
        enderecos: enderecosParaAtualizacao,
      });
    }

    if (Object.keys(enderecosParaInclusao).length !== 0) {
      await servicoCriarEnderecos.executa(
        {
          enderecos: enderecosParaInclusao,
        },
        codigoPessoa,
      );
    }
  }

  private obterRegistrosCadastradosParaExclusao(
    enderecosCadastrados: Endereco[],
    enderecosRequisicao: Endereco[],
  ): Endereco[] {
    return enderecosCadastrados.filter(
      enderecoCadastrado =>
        !enderecosRequisicao.some(enderecosRequisicao =>
          this.saoIguais(enderecosRequisicao, enderecoCadastrado),
        ),
    );
  }

  private obterRegistrosCadastradosParaAtualizacao(
    enderecosCadastrados: Endereco[],
    enderecosRequisicao: Endereco[],
  ): Endereco[] {
    return enderecosRequisicao.filter(enderecoRequisicao =>
      enderecosCadastrados.some(enderecoCadastrado =>
        this.saoIguais(enderecoCadastrado, enderecoRequisicao),
      ),
    );
  }

  private saoIguais(
    enderecoCadastrado: Endereco,
    enderecoRequisicao: Endereco,
  ): boolean {
    return (
      enderecoCadastrado.codigoEndereco == enderecoRequisicao.codigoEndereco
    );
  }
}

export default ServicoAtualizarPessoa;
