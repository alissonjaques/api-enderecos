import validarCamposObrigatorios from '../geral/validarCamposObrigatorios';
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
  }
}

export default ValidacoesCadastrar;
