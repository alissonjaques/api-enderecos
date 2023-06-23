import { getCustomRepository } from 'typeorm';
import Municipio from '../typeorm/entidades/Municipio';
import { RepositorioMunicipio } from '../typeorm/repositorios/RepositorioMunicipio';

class ServicoListarMunicipios {
  private readonly repositorioMunicipio: RepositorioMunicipio;

  constructor() {
    this.repositorioMunicipio = getCustomRepository(RepositorioMunicipio);
  }

  public async executa(): Promise<any[]> {
    const listaMunicipios = await this.repositorioMunicipio.find({
      select: ['codigo_municipio', 'codigo_uf', 'nome', 'status'],
      relations: ['codigo_uf'],
    });

    const listaRetorno = listaMunicipios.map(municipio => {
      return {
        codigoMunicipio: municipio.codigo_municipio,
        codigoUF: municipio.codigo_uf.codigo_uf,
        nome: municipio.nome,
        status: municipio.status,
      };
    });

    return listaRetorno.sort(
      (municipioAtual, municipioProximo) =>
        municipioProximo.codigoMunicipio - municipioAtual.codigoMunicipio,
    );
  }

  public async executaConsultaPersonalizada(params: any): Promise<Municipio[]> {
    let query = this.repositorioMunicipio.createQueryBuilder('tb_municipio');

    if (
      !params.codigoMunicipio &&
      !params.codigoUF &&
      !params.sigla &&
      !params.nome &&
      params.status
    ) {
      query = query.andWhere('tb_municipio.status = :status', {
        status: params.status,
      });
      return (await query.getMany()).sort(
        (municipioAtual, municipioProximo) =>
          municipioProximo.codigo_municipio - municipioAtual.codigo_municipio,
      );
    }

    if (params.codigoMunicipio) {
      query = query.where('tb_municipio.codigo_municipio = :codigoMunicipio', {
        codigoMunicipio: params.codigoMunicipio,
      });
    }

    if (params.codigoUF) {
      query = query.where('tb_municipio.codigo_uf = :codigoUF', {
        codigoUF: params.codigoUF,
      });
    }

    if (params.nome) {
      query = query.andWhere('UPPER(tb_municipio.nome) = :nome', {
        nome: params.nome.toUpperCase(),
      });
    }

    if (params.status) {
      query = query.andWhere('tb_municipio.status = :status', {
        status: params.status,
      });
    }

    return (await query.getMany()).sort(
      (municipioAtual, municipioProximo) =>
        municipioProximo.codigo_municipio - municipioAtual.codigo_municipio,
    );
  }
}

export default ServicoListarMunicipios;
