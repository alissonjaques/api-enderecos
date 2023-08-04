import { getCustomRepository } from 'typeorm';
import { RepositorioMunicipio } from '../../typeorm/repositorios/RepositorioMunicipio';
import AppErros from '@compartilhado/erros/AppErros';

async function existeMunicipioComNomeJaCadastradoNaUf(
  codigoUF: number,
  nome: string,
): Promise<void> {
  if (nome && codigoUF) {
    const repositorioMunicipio = getCustomRepository(RepositorioMunicipio);
    const existeMunicipio = await repositorioMunicipio.encontrarPorNomeEUf(
      codigoUF,
      nome,
    );
    if (existeMunicipio) {
      throw new AppErros(
        `Não foi possível inserir município. Já existe um município com nome = ${nome} cadastrado para o estado de codigoUF = ${codigoUF}.`,
      );
    }
  }
}

export default existeMunicipioComNomeJaCadastradoNaUf;
