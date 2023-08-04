import { getCustomRepository } from 'typeorm';
import { RepositorioUf } from '../../typeorm/repositorios/RepositorioUf';
import AppErros from '@compartilhado/erros/AppErros';

async function existeUfComNomeJaCadastrado(nome: string): Promise<void> {
  if (nome) {
    const repositorioUf = getCustomRepository(RepositorioUf);
    const existeUf = await repositorioUf.encontrarPorNome(nome);
    if (existeUf) {
      throw new AppErros(
        `Não foi possível criar UF. Já existe uma Unidade Federativa com nome = ${nome} cadastrada no sistema.`,
      );
    }
  }
}

export default existeUfComNomeJaCadastrado;
