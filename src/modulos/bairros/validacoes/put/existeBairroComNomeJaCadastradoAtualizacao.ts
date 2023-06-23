import { getCustomRepository } from 'typeorm';
import { RepositorioBairro } from '../../typeorm/repositorios/RepositorioBairro';
import AppErros from '@compartilhado/erros/AppErros';

async function existeBairroComNomeJaCadastradoAtualizacao(
  codigo_bairro: number,
  nome: string,
  nomeBairro: string,
): Promise<void> {
  if (nome && nomeBairro) {
    const repositorioBairro = getCustomRepository(RepositorioBairro);
    const existeBairro = await repositorioBairro.encontrarPorNome(nome);
    if (existeBairro && nome.toUpperCase() !== nomeBairro.toUpperCase()) {
      throw new AppErros(
        `Não foi possível atualizar o bairro de id = ${codigo_bairro}.<br>Motivo: já existe um bairro com o nome = ${nome} cadastrado no sistema.`,
      );
    }
  }
}

export default existeBairroComNomeJaCadastradoAtualizacao;
