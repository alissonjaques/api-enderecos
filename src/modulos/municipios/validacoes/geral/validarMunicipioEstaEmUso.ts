import { getCustomRepository } from 'typeorm';
import { RepositorioMunicipio } from '../../typeorm/repositorios/RepositorioMunicipio';
import AppErros from '@compartilhado/erros/AppErros';

async function validarMunicipioEstaEmUso(
  codigoMunicipio: number,
  status: number,
  descricao: string,
): Promise<void> {
  const repositorioMunicipio = getCustomRepository(RepositorioMunicipio);
  const estaEmUso = await repositorioMunicipio.estaEmUso(codigoMunicipio);
  if (estaEmUso && status == 2) {
    throw new AppErros(
      `Não foi possível ${descricao} o município de codigoMunicipio = ${codigoMunicipio}.<br>Motivo: existem bairros vinculados a esse município, ${
        descricao == 'atualizar' ? 'desative-os' : 'exclua-os'
      } antes de ${
        descricao == 'atualizar' ? 'desativar' : 'excluir'
      } o município.`,
    );
  }
}

export default validarMunicipioEstaEmUso;
