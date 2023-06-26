import validarValorDoStatus from '@compartilhado/validacoes/validarValorDoStatus';
import validarCamposObrigatorios from '../geral/validarCamposObrigatorios';
import existePessoaComLoginJaCadastrado from './existePessoaComLoginJaCadastrado';

interface IRequest {
  nome: string;
  sobrenome: string;
  idade: number;
  login: string;
  senha: string;
  status: number;
}

class ValidacoesCadastrar {
  async validar({
    nome,
    sobrenome,
    idade,
    login,
    senha,
    status,
  }: IRequest): Promise<void> {
    await existePessoaComLoginJaCadastrado(login);
    validarCamposObrigatorios(
      nome,
      sobrenome,
      idade,
      login,
      senha,
      status,
      'incluir',
    );
    validarValorDoStatus(status, 'incluir a pessoa');
  }
}

export default ValidacoesCadastrar;
