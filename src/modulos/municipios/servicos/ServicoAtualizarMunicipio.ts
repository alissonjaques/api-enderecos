import { RepositorioMunicipio } from '../typeorm/repositorios/RepositorioMunicipio';
import Municipio from '../typeorm/entidades/Municipio';
import ServicoListarMunicipios from './ServicoListarMunicipios';
import { getCustomRepository } from 'typeorm';
import ValidacoesAtualizar from '../validacoes/put/ValidacoesAtualizar';
import existeMunicipio from '../validacoes/delete/existeMunicipio';
import AppErros from '@compartilhado/erros/AppErros';
import Uf from '@modules/ufs/typeorm/entidades/Uf';

interface IRequest {
  codigoMunicipio: number;
  codigoUF: number;
  nome: string;
  status: number;
}

class ServicoAtualizarMunicipio {
  public async executa({
    codigoMunicipio,
    codigoUF,
    nome,
    status,
  }: IRequest): Promise<Municipio[]> {
    const repositorioMunicipio = getCustomRepository(RepositorioMunicipio);

    if (!codigoMunicipio) {
      throw new AppErros(
        `Não foi possível atualizar o município no banco de dados.<br>Motivo: o campo codigoMunicipio é obrigatório`,
      );
    }

    if (!codigoUF) {
      throw new AppErros(
        `Não foi possível atualizar o município no banco de dados.<br>Motivo: o campo codigoUF é obrigatório`,
      );
    }

    const municipio = await existeMunicipio(
      codigoMunicipio,
      repositorioMunicipio,
      'atualizar',
    );

    const validacoes = new ValidacoesAtualizar();
    await validacoes.validar(
      { codigoMunicipio, codigoUF, nome, status },
      municipio,
    );

    const uf = new Uf();
    uf.codigoUF = codigoUF;

    municipio.uf = uf;
    municipio.nome = nome;
    municipio.status = status;

    await repositorioMunicipio.save(municipio);

    const servicoListarMunicipios = new ServicoListarMunicipios();
    return await servicoListarMunicipios.executa();
  }
}

export default ServicoAtualizarMunicipio;
