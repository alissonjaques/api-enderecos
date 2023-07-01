import validarCamposObrigatorios from '../geral/validarCamposObrigatorios';
import existeMunicipioComNomeJaCadastradoNaUf from './existeMunicipioComNomeJaCadastradoNaUf';
import existeUfMunicipio from '../geral/existeUfMunicipio';
import validarValorDoStatus from '@compartilhado/validacoes/validarValorDoStatus';
import validarCamposComApenasEspacos from '../geral/validarCamposComApenasEspacos';
import validarCapacidadeMinimaCaracteres from '../geral/validarCapacidadeMinimaCaracteres';

interface IRequest {
  codigoUF: number;
  nome: string;
  status: number;
}

class ValidacoesCadastrar {
  async validar({ codigoUF, nome, status }: IRequest): Promise<void> {
    await existeMunicipioComNomeJaCadastradoNaUf(codigoUF, nome);
    validarCamposObrigatorios(codigoUF, nome, status, 'incluir');
    validarValorDoStatus(status, 'incluir o município');
    await existeUfMunicipio(codigoUF, 'incluir');
    validarCamposComApenasEspacos(nome, 'incluir');
    validarCapacidadeMinimaCaracteres(nome, 'incluir');
  }
}

export default ValidacoesCadastrar;
