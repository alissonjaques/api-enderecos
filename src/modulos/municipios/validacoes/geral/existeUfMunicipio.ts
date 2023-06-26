import AppErros from '@compartilhado/erros/AppErros';
import { RepositorioUf } from '@modules/ufs/typeorm/repositorios/RepositorioUf';
import { getCustomRepository } from 'typeorm';

async function existeUfMunicipio(
  codigo_uf: number,
  descricaoMetodo: string,
): Promise<void> {
  const repositorioUf = getCustomRepository(RepositorioUf);
  const uf = await repositorioUf.findOne(codigo_uf);

  if (!uf) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} o município no banco de dados.<br>Motivo: UF com codigoUF = ${codigo_uf} não encontrada.`,
      404,
    );
  }
}

export default existeUfMunicipio;
