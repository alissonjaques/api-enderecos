import { getCustomRepository } from 'typeorm';
import { RepositorioUf } from '../../typeorm/repositorios/RepositorioUf';
import AppErros from '@compartilhado/erros/AppErros';

async function existeUfComSiglaJaCadastrada(sigla: string): Promise<void> {
  if (sigla) {
    const repositorioUf = getCustomRepository(RepositorioUf);
    const existeUf = await repositorioUf.encontrarPorSigla(sigla);
    if (existeUf) {
      throw new AppErros(
        `Não foi possível criar UF. Já existe uma Unidade Federativa com a sigla = ${sigla} cadastrada no sistema.`,
      );
    }
  }
}

export default existeUfComSiglaJaCadastrada;
