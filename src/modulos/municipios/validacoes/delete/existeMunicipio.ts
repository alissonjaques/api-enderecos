import AppErros from '@compartilhado/erros/AppErros';
import Municipio from '@modules/municipios/typeorm/entidades/Municipio';
import { RepositorioMunicipio } from '@modules/municipios/typeorm/repositorios/RepositorioMunicipio';

async function existeMunicipio(
  codigo_municipio: number,
  repositorioMunicipio: RepositorioMunicipio,
  descricaoMetodo: string,
): Promise<Municipio> {
  const municipio = await repositorioMunicipio.findOne(codigo_municipio);

  if (!municipio) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} o município com codigoMunicipio = ${codigo_municipio}.<br>Motivo: município não encontrado.`,
      404,
    );
  }
  return municipio;
}

export default existeMunicipio;
