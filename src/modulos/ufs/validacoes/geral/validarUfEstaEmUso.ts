import { getCustomRepository } from 'typeorm';
import { RepositorioUf } from '../../typeorm/repositorios/RepositorioUf';
import AppErros from '@compartilhado/erros/AppErros';

async function validarUfEstaEmUso(
  codigoUF: number,
  status: number,
  descricao: string,
): Promise<void> {
  const repositorioUf = getCustomRepository(RepositorioUf);
  const estaEmUso = await repositorioUf.estaEmUso(codigoUF);
  if (estaEmUso && status == 2) {
    throw new AppErros(
      `Não foi possível ${descricao} a UF de codigoUF = ${codigoUF}. Motivo: existem municípios vinculados a essa UF, ${
        descricao == 'atualizar' ? 'desative-os' : 'exclua-os'
      } antes de ${descricao == 'atualizar' ? 'desativar' : 'excluir'} a UF.`,
    );
  }
}

export default validarUfEstaEmUso;
