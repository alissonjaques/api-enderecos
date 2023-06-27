import validarValorDoStatus from '@compartilhado/validacoes/validarValorDoStatus';
import validarCamposObrigatorios from '../geral/validarCamposObrigatorios';
import existePessoaComLoginJaCadastrado from './existePessoaComLoginJaCadastrado';
import Endereco from '@modules/enderecos/typeorm/entidades/Endereco';
import validarExistePeloMenosUmEndereco from '../geral/validarExistePeloMenosUmEndereco';

interface IRequest {
  nome: string;
  sobrenome: string;
  idade: number;
  login: string;
  senha: string;
  status: number;
  enderecos: Endereco[];
}

class ValidacoesCadastrar {
  async validar({
    nome,
    sobrenome,
    idade,
    login,
    senha,
    status,
    enderecos,
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
    validarExistePeloMenosUmEndereco(enderecos, 'incluir');
  }
}

export default ValidacoesCadastrar;
