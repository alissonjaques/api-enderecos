import validarCamposObrigatorios from '../geral/validarCamposObrigatorios';
import validarValorDoStatus from '../geral/validarValorDoStatus';
import existeBairroComNomeJaCadastradoNoMunicipio from './existeBairroComNomeJaCadastradoNoMunicipio';
import existeMunicipioBairro from '../geral/existeMunicipioBairro';

interface IRequest {
  codigo_municipio: number;
  nome: string;
  status: number;
}

class ValidacoesCadastrar {
  async validar({ codigo_municipio, nome, status }: IRequest): Promise<void> {
    await existeBairroComNomeJaCadastradoNoMunicipio(codigo_municipio, nome);
    validarCamposObrigatorios(codigo_municipio, nome, status, 'incluir');
    validarValorDoStatus(status, 'incluir');
    await existeMunicipioBairro(codigo_municipio, 'incluir');
  }
}

export default ValidacoesCadastrar;
