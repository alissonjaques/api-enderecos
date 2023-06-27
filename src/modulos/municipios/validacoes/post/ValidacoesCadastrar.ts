import validarCamposObrigatorios from '../geral/validarCamposObrigatorios';
import existeMunicipioComNomeJaCadastradoNaUf from './existeMunicipioComNomeJaCadastradoNaUf';
import existeUfMunicipio from '../geral/existeUfMunicipio';
import validarValorDoStatus from '@compartilhado/validacoes/validarValorDoStatus';

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
  }
}

export default ValidacoesCadastrar;
