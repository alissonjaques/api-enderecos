import validarCamposObrigatorios from '../geral/validarCamposObrigatorios';
import validarValorDoStatus from '@compartilhado/validacoes/validarValorDoStatus';
import Pessoa from '@modules/pessoas/typeorm/entidades/Pessoa';
import existePessoaComLoginJaCadastradoAtualizacao from './existePessoaComLoginJaCadastradoAtualizacao';
import validarExistePeloMenosUmEndereco from '../geral/validarExistePeloMenosUmEndereco';
import validarExisteEnderecoRepetidoNaLista from '../geral/validarExisteEnderecoRepetidoNaLista';
import Endereco from '@modules/enderecos/typeorm/entidades/Endereco';
import validarCamposComApenasEspacos from '../geral/validarCamposComApenasEspacos';
import validarCapacidadeMinimaCaracteres from '../geral/validarCapacidadeMinimaCaracteres';
import validarSenhaForte from '../geral/validarSenhaForte';

interface IRequest {
  codigoPessoa: number;
  nome: string;
  sobrenome: string;
  idade: number;
  login: string;
  senha: string;
  status: number;
  enderecos: Endereco[];
}

class ValidacoesAtualizar {
  async validar(
    {
      codigoPessoa,
      nome,
      sobrenome,
      idade,
      login,
      senha,
      status,
      enderecos,
    }: IRequest,
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
    validarExistePeloMenosUmEndereco(enderecos, 'atualizar');
    validarExisteEnderecoRepetidoNaLista(enderecos, 'atualizar');
    validarCamposComApenasEspacos(nome, sobrenome, login, senha, 'atualizar');
    validarCapacidadeMinimaCaracteres(nome, sobrenome, 'atualizar');
    validarSenhaForte(senha, 'atualizar');
  }
}

export default ValidacoesAtualizar;
