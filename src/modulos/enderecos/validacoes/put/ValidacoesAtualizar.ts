import validarCamposObrigatorios from '../geral/validarCamposObrigatorios';

interface IRequest {
  codigo_pessoa: number;
  codigo_bairro: number;
  nome_rua: string;
  numero: string;
  complemento: string;
  cep: string;
}

class ValidacoesAtualizar {
  async validar({
    codigo_pessoa,
    codigo_bairro,
    nome_rua,
    numero,
    complemento,
    cep,
  }: IRequest): Promise<void> {
    validarCamposObrigatorios(
      codigo_pessoa,
      codigo_bairro,
      nome_rua,
      numero,
      complemento,
      cep,
      'atualizar',
    );
  }
}

export default ValidacoesAtualizar;
