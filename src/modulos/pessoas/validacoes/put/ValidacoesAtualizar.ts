import validarCamposObrigatorios from '../geral/validarCamposObrigatorios';
import validarValorDoStatus from '@compartilhado/validacoes/validarValorDoStatus';
import Pessoa from '@modules/pessoas/typeorm/entidades/Pessoa';
import existePessoaComLoginJaCadastradoAtualizacao from './existePessoaComLoginJaCadastradoAtualizacao';

interface IRequest {
  codigoPessoa: number;
  nome: string;
  sobrenome: string;
  idade: number;
  login: string;
  senha: string;
  status: number;
}

class ValidacoesAtualizar {
  async validar(
    { codigoPessoa, nome, sobrenome, idade, login, senha, status }: IRequest,
    pessoa: Pessoa,
  ): Promise<void> {
    await existePessoaComLoginJaCadastradoAtualizacao(
      codigoPessoa,
      login,
      pessoa.login,
    );
    validarCamposObrigatorios(
      nome,
      sobrenome,
      idade,
      login,
      senha,
      status,
      'atualizar',
    );
    validarValorDoStatus(status, 'atualizar a pessoa');
  }
}

export default ValidacoesAtualizar;
