import { getCustomRepository } from 'typeorm';
import { RepositorioBairro } from '../../typeorm/repositorios/RepositorioBairro';
import AppErros from '@compartilhado/erros/AppErros';

async function existeBairroComNomeJaCadastradoNoMunicipio(
  codigoMunicipio: number,
  nome: string,
): Promise<void> {
  if (nome && codigoMunicipio) {
    const repositorioBairro = getCustomRepository(RepositorioBairro);
    const existeBairro = await repositorioBairro.encontrarPorNomeEMunicipio(
      codigoMunicipio,
      nome,
    );
    if (existeBairro) {
      throw new AppErros(
        `Não foi possível inserir bairro. Já existe um bairro com nome = ${nome} cadastrado no munípio de codigoMunicipio = ${codigoMunicipio}.`,
      );
    }
  }
}

export default existeBairroComNomeJaCadastradoNoMunicipio;
