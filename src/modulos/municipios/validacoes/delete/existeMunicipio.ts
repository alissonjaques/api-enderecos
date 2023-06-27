import AppErros from '@compartilhado/erros/AppErros';
import Municipio from '@modules/municipios/typeorm/entidades/Municipio';
import { RepositorioMunicipio } from '@modules/municipios/typeorm/repositorios/RepositorioMunicipio';

async function existeMunicipio(
  codigoMunicipio: number,
  repositorioMunicipio: RepositorioMunicipio,
  descricaoMetodo: string,
): Promise<Municipio> {
  const municipio = await repositorioMunicipio.findOne(codigoMunicipio);

  if (!municipio) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} o município com codigoMunicipio = ${codigoMunicipio}.<br>Motivo: município não encontrado.`,
      404,
    );
  }
  return municipio;
}

export default existeMunicipio;
