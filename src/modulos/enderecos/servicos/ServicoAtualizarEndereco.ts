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
  codigoEndereco: number;
  codigoPessoa: number;
  codigoBairro: number;
  nomeRua: string;
  numero: string;
  complemento: string;
  cep: string;
}

class ServicoAtualizarEndereco {
  public async executa({
    codigoEndereco,
    codigoPessoa,
    codigoBairro,
    nomeRua,
    numero,
    complemento,
    cep,
  }: IRequest): Promise<Endereco[]> {
    const repositorioEndereco = getCustomRepository(RepositorioEndereco);

    if (!codigoEndereco) {
      throw new AppErros(
        `Não foi possível atualizar o endereço no banco de dados.<br>Motivo: o campo codigoEndereco é obrigatório`,
      );
    }

    const endereco = await existeEndereco(
      codigoEndereco,
      repositorioEndereco,
      'atualizar',
    );

    const validacoes = new ValidacoesAtualizar();
    await validacoes.validar({
      codigoPessoa,
      codigoBairro,
      nomeRua,
      numero,
      complemento,
      cep,
    });

    const pessoa = new Pessoa();
    pessoa.codigoPessoa = codigoPessoa;

    const bairro = new Bairro();
    bairro.codigoBairro = codigoBairro;

    endereco.pessoa = pessoa;
    endereco.bairro = bairro;
    endereco.nomeRua = nomeRua;
    endereco.numero = numero;
    endereco.complemento = complemento;
    endereco.cep = cep;

    await repositorioEndereco.save(endereco);

    const servicoListarEnderecos = new ServicoListarEnderecos();
    return await servicoListarEnderecos.executa(codigoPessoa);
  }
}

export default ServicoAtualizarEndereco;
