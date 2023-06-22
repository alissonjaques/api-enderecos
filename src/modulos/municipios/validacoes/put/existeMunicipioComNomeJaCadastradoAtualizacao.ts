import { getCustomRepository } from 'typeorm';
import { RepositorioMunicipio } from '../../typeorm/repositorios/RepositorioMunicipio';
import AppErros from '@compartilhado/erros/AppErros';

async function existeMunicipioComNomeJaCadastradoAtualizacao(
  codigo_municipio: number,
  nome: string,
  nomeMunicipio: string,
): Promise<void> {
  const repositorioMunicipio = getCustomRepository(RepositorioMunicipio);
  const existeMunicipio = await repositorioMunicipio.encontrarPorNome(nome);
  if (existeMunicipio && nome.toUpperCase() !== nomeMunicipio.toUpperCase()) {
    throw new AppErros(
      `Não foi possível atualizar o município de id = ${codigo_municipio}.<br>Motivo: já existe um município com o nome = ${nome} cadastrado no sistema.`,
    );
  }
}

export default existeMunicipioComNomeJaCadastradoAtualizacao;
