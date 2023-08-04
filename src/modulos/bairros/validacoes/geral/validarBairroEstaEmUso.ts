import { getCustomRepository } from 'typeorm';
import { RepositorioBairro } from '../../typeorm/repositorios/RepositorioBairro';
import AppErros from '@compartilhado/erros/AppErros';

async function validarBairroEstaEmUso(
  codigoBairro: number,
  status: number,
  descricao: string,
): Promise<void> {
  const repositorioBairro = getCustomRepository(RepositorioBairro);
  const estaEmUso = await repositorioBairro.estaEmUso(codigoBairro);
  if (estaEmUso && status == 2) {
    throw new AppErros(
      `Não foi possível ${descricao} o bairro de codigoBairro = ${codigoBairro}. Motivo: existem endereços vinculados a esse bairro, ${
        descricao == 'atualizar' ? 'desative-os' : 'exclua-os'
      } antes de ${
        descricao == 'atualizar' ? 'desativar' : 'excluir'
      } o bairro.`,
    );
  }
}

export default validarBairroEstaEmUso;
