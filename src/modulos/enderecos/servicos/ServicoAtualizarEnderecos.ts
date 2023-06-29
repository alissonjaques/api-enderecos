import { RepositorioEndereco } from '../typeorm/repositorios/RepositorioEndereco';
import Endereco from '../typeorm/entidades/Endereco';
import ServicoListarEnderecos from './ServicoListarEnderecos';
import { getCustomRepository } from 'typeorm';
import ValidacoesAtualizar from '../validacoes/put/ValidacoesAtualizar';
import existeEndereco from '../validacoes/delete/existeEndereco';
import AppErros from '@compartilhado/erros/AppErros';
import Pessoa from '@modules/pessoas/typeorm/entidades/Pessoa';
import Bairro from '@modules/bairros/typeorm/entidades/Bairro';

interface IRequest {
  codigoPessoa: number;
  enderecos: any[];
}

class ServicoAtualizarEnderecos {
  public async validarEnderecos({
    codigoPessoa,
    enderecos,
  }: IRequest): Promise<void> {
    const validacoes = new ValidacoesAtualizar();
    for (let i = 0; i < enderecos.length; i++) {
      const endereco = enderecos[i];
      await validacoes.validar({
        codigoEndereco: endereco.codigoEndereco,
        codigoPessoa: endereco.codigoPessoa,
        codigoBairro: endereco.codigoBairro,
        nomeRua: endereco.nomeRua,
        numero: endereco.numero,
        complemento: endereco.complemento,
        cep: endereco.cep,
        codigoPessoaEndereco: codigoPessoa,
      });
    }
  }

  public async executa({
    enderecos,
    codigoPessoa,
  }: IRequest): Promise<Endereco[]> {
    const repositorioEndereco = getCustomRepository(RepositorioEndereco);

    for (let i = 0; i < enderecos.length; i++) {
      const enderecoRequisicao = enderecos[i];
      if (!enderecoRequisicao.codigoEndereco) {
        throw new AppErros(
          `Não foi possível atualizar o endereço no banco de dados.<br>Motivo: o campo codigoEndereco é obrigatório`,
        );
      }

      const endereco = await existeEndereco(
        enderecoRequisicao.codigoEndereco,
        repositorioEndereco,
        'atualizar',
      );

      const validacoes = new ValidacoesAtualizar();
      await validacoes.validar({
        codigoEndereco: enderecoRequisicao.codigoEndereco,
        codigoPessoa: enderecoRequisicao.codigoPessoa,
        codigoBairro: enderecoRequisicao.codigoBairro,
        nomeRua: enderecoRequisicao.nomeRua,
        numero: enderecoRequisicao.numero,
        complemento: enderecoRequisicao.complemento,
        cep: enderecoRequisicao.cep,
        codigoPessoaEndereco: codigoPessoa,
      });

      const pessoa = new Pessoa();
      pessoa.codigoPessoa = enderecoRequisicao.codigoPessoa;

      const bairro = new Bairro();
      bairro.codigoBairro = enderecoRequisicao.codigoBairro;

      endereco.pessoa = pessoa;
      endereco.bairro = bairro;
      endereco.nomeRua = enderecoRequisicao.nomeRua;
      endereco.numero = enderecoRequisicao.numero;
      endereco.complemento = enderecoRequisicao.complemento;
      endereco.cep = enderecoRequisicao.cep;
    }

    await repositorioEndereco.save(enderecos);

    const servicoListarEnderecos = new ServicoListarEnderecos();
    return await servicoListarEnderecos.executa(codigoPessoa);
  }
}

export default ServicoAtualizarEnderecos;
