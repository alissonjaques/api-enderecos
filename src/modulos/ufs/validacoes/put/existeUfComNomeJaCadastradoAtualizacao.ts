import { getCustomRepository } from 'typeorm';
import { RepositorioUf } from '../../typeorm/repositorios/RepositorioUf';
import AppErros from '@compartilhado/erros/AppErros';

async function existeUfComNomeJaCadastradoAtualizacao(
  codigoUF: number,
  nome: string,
  nomeUf: string,
): Promise<void> {
  if (nome && nomeUf) {
    const repositorioUf = getCustomRepository(RepositorioUf);
    const existeUf = await repositorioUf.encontrarPorNome(nome);
    if (existeUf && nome.toUpperCase() !== nomeUf.toUpperCase()) {
      throw new AppErros(
        `Não foi atualizar a UF de codigoUF = ${codigoUF}. Motivo: já existe uma Unidade Federativa com o nome = ${nome} cadastrada no sistema.`,
      );
    }
  }
}

export default existeUfComNomeJaCadastradoAtualizacao;
