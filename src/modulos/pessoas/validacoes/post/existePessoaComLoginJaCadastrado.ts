import AppErros from '@compartilhado/erros/AppErros';
import { RepositorioPessoa } from '@modules/pessoas/typeorm/repositorios/RepositorioPessoa';
import { getCustomRepository } from 'typeorm';

async function existePessoaComLoginJaCadastrado(login: string): Promise<void> {
  if (login) {
    const repositorioPessoa = getCustomRepository(RepositorioPessoa);
    const existePessoa = await repositorioPessoa.encontrarPorLogin(login);
    if (existePessoa) {
      throw new AppErros(
        `Não foi possível criar Pessoa.<br>Já existe uma pessoa com login = ${login} cadastrada no sistema.`,
      );
    }
  }
}

export default existePessoaComLoginJaCadastrado;
