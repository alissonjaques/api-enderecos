import { getCustomRepository } from 'typeorm';
import { RepositorioMunicipio } from '../../typeorm/repositorios/RepositorioMunicipio';
import AppErros from '@compartilhado/erros/AppErros';

async function existeMunicipioComNomeJaCadastradoAtualizacao(
  codigoMunicipio: number,
  codigoUF: number,
  nome: string,
  nomeMunicipio: string,
): Promise<void> {
  if (nome && nomeMunicipio) {
    const repositorioMunicipio = getCustomRepository(RepositorioMunicipio);
    const existeMunicipio = await repositorioMunicipio.encontrarPorNomeEUf(
      codigoUF,
      nome,
    );
    if (existeMunicipio && nome.toUpperCase() !== nomeMunicipio.toUpperCase()) {
      throw new AppErros(
        `Não foi possível atualizar o município de codigoMunicipio = ${codigoMunicipio}.<br>Motivo: já existe um município com o nome = ${nome} cadastrado para a UF com codigoUF = ${codigoUF}.`,
      );
    }
  }
}

export default existeMunicipioComNomeJaCadastradoAtualizacao;
