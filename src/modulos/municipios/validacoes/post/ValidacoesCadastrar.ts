import validarCamposObrigatorios from '../geral/validarCamposObrigatorios';
import validarValorDoStatus from '../geral/validarValorDoStatus';
import existeMunicipioComNomeJaCadastradoNaUf from './existeMunicipioComNomeJaCadastradoNaUf';
import existeUfMunicipio from './existeUfMunicipio';

interface IRequest {
  codigo_uf: number;
  nome: string;
  status: number;
}

class ValidacoesCadastrar {
  async validar({ codigo_uf, nome, status }: IRequest): Promise<void> {
    await existeMunicipioComNomeJaCadastradoNaUf(codigo_uf, nome);
    validarCamposObrigatorios(codigo_uf, nome, status, 'incluir');
    validarValorDoStatus(status, 'incluir');
    await existeUfMunicipio(codigo_uf, 'incluir');
  }
}

export default ValidacoesCadastrar;
