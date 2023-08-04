import AppErros from '@compartilhado/erros/AppErros';
import { RepositorioMunicipio } from '@modules/municipios/typeorm/repositorios/RepositorioMunicipio';
import { getCustomRepository } from 'typeorm';

async function existeMunicipioBairro(
  codigoMunicipio: number,
  descricaoMetodo: string,
): Promise<void> {
  const repositorioMunicipio = getCustomRepository(RepositorioMunicipio);
  const municipio = await repositorioMunicipio.findOne(codigoMunicipio);

  if (!municipio) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} o bairro no banco de dados. Motivo: município com codigoMunicipio = ${codigoMunicipio} não encontrado.`,
      404,
    );
  }
}

export default existeMunicipioBairro;
