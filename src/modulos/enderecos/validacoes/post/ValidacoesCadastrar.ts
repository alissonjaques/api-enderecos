import validarCamposObrigatorios from '../geral/validarCamposObrigatorios';

interface IRequest {
  codigoPessoa: number;
  codigoBairro: number;
  nomeRua: string;
  numero: string;
  complemento: string;
  cep: string;
}

class ValidacoesCadastrar {
  async validar({
    codigoPessoa,
    codigoBairro,
    nomeRua,
    numero,
    complemento,
    cep,
  }: IRequest): Promise<void> {
    validarCamposObrigatorios(
      codigoPessoa,
      codigoBairro,
      nomeRua,
      numero,
      complemento,
      cep,
      'incluir',
    );
  }
}

export default ValidacoesCadastrar;
