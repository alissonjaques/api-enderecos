import { getCustomRepository } from 'typeorm';
import validarCamposObrigatorios from '../geral/validarCamposObrigatorios';
import validarExisteBairro from '../geral/validarExisteBairro';
import { RepositorioBairro } from '@modules/bairros/typeorm/repositorios/RepositorioBairro';
import { RepositorioEndereco } from '@modules/enderecos/typeorm/repositorios/RepositorioEndereco';
import validarExisteEndereco from '../geral/validarExisteEndereco';
import { RepositorioPessoa } from '@modules/pessoas/typeorm/repositorios/RepositorioPessoa';
import validarExistePessoa from '../geral/validarExistePessoa';
import validarIgualdadeDePessoas from './validarIgualdadeDePessoas';
import AppErros from '@compartilhado/erros/AppErros';
import existeEndereco from '../delete/existeEndereco';
import validarCamposComApenasEspacos from '../geral/validarCamposComApenasEspacos';

interface IRequest {
  codigoEndereco: number;
  codigoPessoa: number;
  codigoBairro: number;
  nomeRua: string;
  numero: string;
  complemento: string;
  cep: string;
  codigoPessoaEndereco: number;
}

class ValidacoesAtualizar {
  async validar({
    codigoEndereco,
    codigoPessoa,
    codigoBairro,
    nomeRua,
    numero,
    complemento,
    cep,
    codigoPessoaEndereco,
  }: IRequest): Promise<void> {
    const repositorioEndereco = getCustomRepository(RepositorioEndereco);
    await existeEndereco(codigoEndereco, repositorioEndereco, 'atualizar');
    if (!codigoPessoa) {
      throw new AppErros(
        `Não foi possível atualizar o endereço no banco de dados.<br>Motivo: o campo codigoPessoa é obrigatório`,
      );
    }

    await validarExisteEndereco(
      codigoEndereco,
      repositorioEndereco,
      'atualizar',
    );

    const repositorioPessoa = getCustomRepository(RepositorioPessoa);
    await validarExistePessoa(codigoPessoa, repositorioPessoa, 'atualizar');

    const repositorioBairro = getCustomRepository(RepositorioBairro);
    await validarExisteBairro(codigoBairro, repositorioBairro, 'atualizar');

    validarIgualdadeDePessoas(codigoPessoa, codigoPessoaEndereco);

    validarCamposObrigatorios(
      codigoBairro,
      nomeRua,
      numero,
      complemento,
      cep,
      'atualizar',
    );
    validarCamposComApenasEspacos(
      nomeRua,
      numero,
      complemento,
      cep,
      'atualizar',
    );
  }
}

export default ValidacoesAtualizar;
