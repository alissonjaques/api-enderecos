import validarCamposObrigatorios from '../geral/validarCamposObrigatorios';
import existeBairroComNomeJaCadastradoNoMunicipio from './existeBairroComNomeJaCadastradoNoMunicipio';
import existeMunicipioBairro from '../geral/existeMunicipioBairro';
import validarValorDoStatus from '@compartilhado/validacoes/validarValorDoStatus';
import validarCamposComApenasEspacos from '../geral/validarCamposComApenasEspacos';
import validarCapacidadeMinimaCaracteres from '../geral/validarCapacidadeMinimaCaracteres';

interface IRequest {
  codigoMunicipio: number;
  nome: string;
  status: number;
}

class ValidacoesCadastrar {
  async validar({ codigoMunicipio, nome, status }: IRequest): Promise<void> {
    await existeBairroComNomeJaCadastradoNoMunicipio(codigoMunicipio, nome);
    validarCamposObrigatorios(codigoMunicipio, nome, status, 'incluir');
    validarValorDoStatus(status, 'incluir o bairro');
    await existeMunicipioBairro(codigoMunicipio, 'incluir');
    validarCamposComApenasEspacos(nome, 'incluir');
    validarCapacidadeMinimaCaracteres(nome, 'incluir');
  }
}

export default ValidacoesCadastrar;
