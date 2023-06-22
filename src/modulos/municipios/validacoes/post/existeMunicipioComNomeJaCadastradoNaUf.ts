import { getCustomRepository } from 'typeorm';
import { RepositorioMunicipio } from '../../typeorm/repositorios/RepositorioMunicipio';
import AppErros from '@compartilhado/erros/AppErros';

async function existeMunicipioComNomeJaCadastradoNaUf(
  codigo_uf: number,
  nome: string,
): Promise<void> {
  if (nome && codigo_uf) {
    const repositorioMunicipio = getCustomRepository(RepositorioMunicipio);
    const existeMunicipio = await repositorioMunicipio.encontrarPorNomeEUf(
      codigo_uf,
      nome,
    );
    if (existeMunicipio) {
      throw new AppErros(
        `Não foi possível inserir município.<br>Já existe um município com nome = ${nome} cadastrado no sistema.`,
      );
    }
  }
}

export default existeMunicipioComNomeJaCadastradoNaUf;
