import validarCamposObrigatorios from '../geral/validarCamposObrigatorios';
import existeMunicipioComNomeJaCadastradoNaUf from './existeMunicipioComNomeJaCadastradoNaUf';
import existeUfMunicipio from '../geral/existeUfMunicipio';
import validarValorDoStatus from '@compartilhado/validacoes/validarValorDoStatus';

interface IRequest {
  codigo_uf: number;
  nome: string;
  status: number;
}

class ValidacoesCadastrar {
  async validar({ codigo_uf, nome, status }: IRequest): Promise<void> {
    await existeMunicipioComNomeJaCadastradoNaUf(codigo_uf, nome);
    validarCamposObrigatorios(codigo_uf, nome, status, 'incluir');
    validarValorDoStatus(status, 'incluir o município');
    await existeUfMunicipio(codigo_uf, 'incluir');
  }
}

export default ValidacoesCadastrar;
