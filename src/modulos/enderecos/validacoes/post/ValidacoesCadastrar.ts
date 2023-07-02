import { getCustomRepository } from 'typeorm';
import validarCamposObrigatorios from '../geral/validarCamposObrigatorios';
import validarExisteBairro from '../geral/validarExisteBairro';
import { RepositorioBairro } from '@modules/bairros/typeorm/repositorios/RepositorioBairro';
import validarCamposComApenasEspacos from '../geral/validarCamposComApenasEspacos';
import validarCapacidadeMinimaCaracteres from '../geral/validarCapacidadeMinimaCaracteres';
import validarCep from '../geral/validarCep';
import validarCampoNumero from '../geral/validarCampoNumero';

interface IRequest {
  codigoBairro: number;
  nomeRua: string;
  numero: string;
  complemento: string;
  cep: string;
}

class ValidacoesCadastrar {
  async validar({
    codigoBairro,
    nomeRua,
    numero,
    complemento,
    cep,
  }: IRequest): Promise<void> {
    const repositorioBairro = getCustomRepository(RepositorioBairro);
    await validarExisteBairro(codigoBairro, repositorioBairro, 'cadastrar');
    validarCamposObrigatorios(
      codigoBairro,
      nomeRua,
      numero,
      complemento,
      cep,
      'incluir',
    );
    validarCamposComApenasEspacos(nomeRua, numero, complemento, cep, 'incluir');
    validarCapacidadeMinimaCaracteres(nomeRua, complemento, 'incluir');
    validarCep(cep, 'incluir');
    validarCampoNumero(numero, 'incluir');
  }
}

export default ValidacoesCadastrar;
