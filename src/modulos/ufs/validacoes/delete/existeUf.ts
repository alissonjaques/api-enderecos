import { RepositorioUf } from '../../typeorm/repositorios/RepositorioUf';
import AppErros from '@compartilhado/erros/AppErros';
import Uf from '../../typeorm/entidades/Uf';

async function existeUf(
  codigo_uf: number,
  repositorioUf: RepositorioUf,
  descricaoMetodo: string,
): Promise<Uf> {
  const uf = await repositorioUf.findOne(codigo_uf);

  if (!uf) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} a UF com codigoUF = ${codigo_uf}.<br>Motivo: UF não encontrada.`,
      404,
    );
  }
  return uf;
}

export default existeUf;
