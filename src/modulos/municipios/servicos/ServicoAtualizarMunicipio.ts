import { RepositorioMunicipio } from '../typeorm/repositorios/RepositorioMunicipio';
import Municipio from '../typeorm/entidades/Municipio';
import ServicoListarMunicipios from './ServicoListarMunicipios';
import { getCustomRepository } from 'typeorm';
import ValidacoesAtualizar from '../validacoes/put/ValidacoesAtualizar';
import existeMunicipio from '../validacoes/delete/existeMunicipio';
import AppErros from '@compartilhado/erros/AppErros';
import Uf from '@modules/ufs/typeorm/entidades/Uf';

interface IRequest {
  codigo_municipio: number;
  codigo_uf: number;
  nome: string;
  status: number;
}

class ServicoAtualizarMunicipio {
  public async executa({
    codigo_municipio,
    codigo_uf,
    nome,
    status,
  }: IRequest): Promise<Municipio[]> {
    const repositorioMunicipio = getCustomRepository(RepositorioMunicipio);

    if (!codigo_municipio) {
      throw new AppErros(
        `Não foi possível atualizar o município no banco de dados.<br>Motivo: o campo codigoMunicipio é obrigatório`,
      );
    }

    const municipio = await existeMunicipio(
      codigo_municipio,
      repositorioMunicipio,
      'atualizar',
    );

    const validacoes = new ValidacoesAtualizar();
    await validacoes.validar(
      { codigo_municipio, codigo_uf, nome, status },
      municipio,
    );

    const uf = new Uf();
    uf.codigo_uf = codigo_uf;

    municipio.codigo_uf = uf;
    municipio.nome = nome;
    municipio.status = status;

    await repositorioMunicipio.save(municipio);

    const servicoListarMunicipios = new ServicoListarMunicipios();
    return await servicoListarMunicipios.executa();
  }
}

export default ServicoAtualizarMunicipio;
