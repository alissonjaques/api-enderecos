import { getCustomRepository } from 'typeorm';
import { RepositorioBairro } from '../../typeorm/repositorios/RepositorioBairro';
import AppErros from '@compartilhado/erros/AppErros';

async function existeBairroComNomeJaCadastradoAtualizacao(
  codigo_bairro: number,
  codigo_municipio: number,
  nome: string,
  nomeBairro: string,
): Promise<void> {
  if (nome && nomeBairro) {
    const repositorioBairro = getCustomRepository(RepositorioBairro);
    const existeBairro = await repositorioBairro.encontrarPorNomeEMunicipio(
      codigo_municipio,
      nome,
    );
    if (existeBairro && nome.toUpperCase() !== nomeBairro.toUpperCase()) {
      throw new AppErros(
        `Não foi possível atualizar o bairro de codigoBairro = ${codigo_bairro}.<br>Motivo: já existe um bairro com o nome = ${nome} cadastrado no mesmo município.`,
      );
    }
  }
}

export default existeBairroComNomeJaCadastradoAtualizacao;
