import validarCamposObrigatorios from '../geral/validarCamposObrigatorios';
import existeBairroComNomeJaCadastradoNoMunicipio from './existeBairroComNomeJaCadastradoNoMunicipio';
import existeMunicipioBairro from '../geral/existeMunicipioBairro';
import validarValorDoStatus from '@compartilhado/validacoes/validarValorDoStatus';

interface IRequest {
  codigo_municipio: number;
  nome: string;
  status: number;
}

class ValidacoesCadastrar {
  async validar({ codigo_municipio, nome, status }: IRequest): Promise<void> {
    await existeBairroComNomeJaCadastradoNoMunicipio(codigo_municipio, nome);
    validarCamposObrigatorios(codigo_municipio, nome, status, 'incluir');
    validarValorDoStatus(status, 'incluir o bairro');
    await existeMunicipioBairro(codigo_municipio, 'incluir');
  }
}

export default ValidacoesCadastrar;
