import { getCustomRepository } from 'typeorm';
import AppErros from '@compartilhado/erros/AppErros';
import { RepositorioPessoa } from '@modules/pessoas/typeorm/repositorios/RepositorioPessoa';

async function existePessoaComLoginJaCadastradoAtualizacao(
  codigo_pessoa: number,
  login: string,
  loginPessoa: string,
): Promise<void> {
  if (login && loginPessoa) {
    const repositorioPessoa = getCustomRepository(RepositorioPessoa);
    const existePessoa = await repositorioPessoa.encontrarPorLogin(login);
    if (existePessoa && login.toUpperCase() !== loginPessoa.toUpperCase()) {
      throw new AppErros(
        `Não foi atualizar a pessoa de codigoPessoa = ${codigo_pessoa}.<br>Motivo: já existe uma pessoa com o login = ${login} cadastrada no sistema.`,
      );
    }
  }
}

export default existePessoaComLoginJaCadastradoAtualizacao;
