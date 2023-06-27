import { getCustomRepository } from 'typeorm';
import { RepositorioUf } from '../../typeorm/repositorios/RepositorioUf';
import AppErros from '@compartilhado/erros/AppErros';

async function existeUfComSiglaJaCadastradaAtualizacao(
  codigoUF: number,
  sigla: string,
  siglaUf: string,
): Promise<void> {
  if (sigla && siglaUf) {
    const repositorioUf = getCustomRepository(RepositorioUf);
    const existeUf = await repositorioUf.encontrarPorSigla(sigla);
    if (existeUf && sigla.toUpperCase() !== siglaUf.toUpperCase()) {
      throw new AppErros(
        `Não foi atualizar a UF de codigoUF = ${codigoUF}.<br>Motivo: já existe uma Unidade Federativa com a sigla = ${sigla} cadastrada no sistema.`,
      );
    }
  }
}

export default existeUfComSiglaJaCadastradaAtualizacao;
