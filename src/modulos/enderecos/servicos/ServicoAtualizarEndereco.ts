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
  codigo_endereco: number;
  codigo_pessoa: number;
  codigo_bairro: number;
  nome_rua: string;
  numero: string;
  complemento: string;
  cep: string;
}

class ServicoAtualizarEndereco {
  public async executa({
    codigo_endereco,
    codigo_pessoa,
    codigo_bairro,
    nome_rua,
    numero,
    complemento,
    cep,
  }: IRequest): Promise<Endereco[]> {
    const repositorioEndereco = getCustomRepository(RepositorioEndereco);

    if (!codigo_endereco) {
      throw new AppErros(
        `Não foi possível atualizar o endereço no banco de dados.<br>Motivo: o campo codigoEndereco é obrigatório`,
      );
    }

    const endereco = await existeEndereco(
      codigo_endereco,
      repositorioEndereco,
      'atualizar',
    );

    const validacoes = new ValidacoesAtualizar();
    await validacoes.validar({
      codigo_pessoa,
      codigo_bairro,
      nome_rua,
      numero,
      complemento,
      cep,
    });

    const pessoa = new Pessoa();
    pessoa.codigo_pessoa = codigo_pessoa;

    const bairro = new Bairro();
    bairro.codigo_bairro = codigo_bairro;

    endereco.codigo_pessoa = pessoa;
    endereco.codigo_bairro = bairro;
    endereco.nome_rua = nome_rua;
    endereco.numero = numero;
    endereco.complemento = complemento;
    endereco.cep = cep;

    await repositorioEndereco.save(endereco);

    const servicoListarEnderecos = new ServicoListarEnderecos();
    return await servicoListarEnderecos.executa();
  }
}

export default ServicoAtualizarEndereco;
