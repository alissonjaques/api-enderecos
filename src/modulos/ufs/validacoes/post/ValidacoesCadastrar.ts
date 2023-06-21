import validarCamposObrigatorios from '../geral/validarCamposObrigatorios';
import validarValorDoStatus from '../geral/validarValorDoStatus';
import existeUfComNomeJaCadastrado from './existeUfComNomeJaCadastrado';
import existeUfComSiglaJaCadastrada from './existeUfComSiglaJaCadastrada';

interface IRequest {
  sigla: string;
  nome: string;
  status: number;
}

class ValidacoesCadastrar {
  async validar({ sigla, nome, status }: IRequest): Promise<void> {
    await existeUfComSiglaJaCadastrada(sigla);
    await existeUfComNomeJaCadastrado(nome);
    validarCamposObrigatorios(sigla, nome, status, 'incluir');
    validarValorDoStatus(status, 'incluir');
  }
}

export default ValidacoesCadastrar;
