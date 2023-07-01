import validarValorDoStatus from '@compartilhado/validacoes/validarValorDoStatus';
import validarCamposObrigatorios from '../geral/validarCamposObrigatorios';
import existePessoaComLoginJaCadastrado from './existePessoaComLoginJaCadastrado';
import Endereco from '@modules/enderecos/typeorm/entidades/Endereco';
import validarExistePeloMenosUmEndereco from '../geral/validarExistePeloMenosUmEndereco';
import validarExisteEnderecoRepetidoNaLista from '../geral/validarExisteEnderecoRepetidoNaLista';
import validarCamposComApenasEspacos from '../geral/validarCamposComApenasEspacos';
import validarCapacidadeMinimaCaracteres from '../geral/validarCapacidadeMinimaCaracteres';

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
    validarExisteEnderecoRepetidoNaLista(enderecos, 'incluir');
    validarCamposComApenasEspacos(nome, sobrenome, login, senha, 'incluir');
    validarCapacidadeMinimaCaracteres(nome, sobrenome, 'incluir');
  }
}

export default ValidacoesCadastrar;
