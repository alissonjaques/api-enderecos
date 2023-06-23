import AppErros from '@compartilhado/erros/AppErros';
import { RepositorioMunicipio } from '@modules/municipios/typeorm/repositorios/RepositorioMunicipio';
import { getCustomRepository } from 'typeorm';

async function existeMunicipioBairro(
  codigo_municipio: number,
  descricaoMetodo: string,
): Promise<void> {
  const repositorioMunicipio = getCustomRepository(RepositorioMunicipio);
  const municipio = await repositorioMunicipio.findOne(codigo_municipio);

  if (!municipio) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} o bairro no banco de dados.<br>Motivo: município com codigoMunicipio = ${codigo_municipio} não encontrado.`,
      404,
    );
  }
}

export default existeMunicipioBairro;
