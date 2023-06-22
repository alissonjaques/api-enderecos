import { getCustomRepository } from 'typeorm';
import { RepositorioMunicipio } from '../../typeorm/repositorios/RepositorioMunicipio';
import AppErros from '@compartilhado/erros/AppErros';

async function existeMunicipioComNomeJaCadastrado(nome: string): Promise<void> {
  if (nome) {
    const repositorioMunicipio = getCustomRepository(RepositorioMunicipio);
    const existeMunicipio = await repositorioMunicipio.encontrarPorNome(nome);
    if (existeMunicipio) {
      throw new AppErros(
        `Não foi possível inserir município.<br>Já existe um município com nome = ${nome} cadastrado no sistema.`,
      );
    }
  }
}

export default existeMunicipioComNomeJaCadastrado;
