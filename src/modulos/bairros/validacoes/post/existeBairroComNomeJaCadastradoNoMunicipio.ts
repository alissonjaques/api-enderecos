import { getCustomRepository } from 'typeorm';
import { RepositorioBairro } from '../../typeorm/repositorios/RepositorioBairro';
import AppErros from '@compartilhado/erros/AppErros';

async function existeBairroComNomeJaCadastradoNoMunicipio(
  codigo_municipio: number,
  nome: string,
): Promise<void> {
  if (nome && codigo_municipio) {
    const repositorioBairro = getCustomRepository(RepositorioBairro);
    const existeBairro = await repositorioBairro.encontrarPorNomeEMunicipio(
      codigo_municipio,
      nome,
    );
    if (existeBairro) {
      throw new AppErros(
        `Não foi possível inserir bairro.<br>Já existe um bairro com nome = ${nome} cadastrado no munípio de codigoMunicipio = ${codigo_municipio}.`,
      );
    }
  }
}

export default existeBairroComNomeJaCadastradoNoMunicipio;
