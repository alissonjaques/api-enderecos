import existeUfComNomeJaCadastrado from './existeUfComNomeJaCadastrado';
import existeUfComSiglaJaCadastrada from './existeUfComSiglaJaCadastrada';
import validarCamposObrigatorios from './validarCamposObrigatorios';

interface IRequest {
  sigla: string;
  nome: string;
  status: number;
}

class Validacoes {
  async validar({ sigla, nome, status }: IRequest): Promise<void> {
    await existeUfComSiglaJaCadastrada(sigla);
    await existeUfComNomeJaCadastrado(nome);
    validarCamposObrigatorios(sigla, nome, status);
  }
}

export default Validacoes;
