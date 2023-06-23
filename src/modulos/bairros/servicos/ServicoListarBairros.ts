import { getCustomRepository } from 'typeorm';
import Bairro from '../typeorm/entidades/Bairro';
import { RepositorioBairro } from '../typeorm/repositorios/RepositorioBairro';

class ServicoListarBairros {
  private readonly repositorioBairro: RepositorioBairro;

  constructor() {
    this.repositorioBairro = getCustomRepository(RepositorioBairro);
  }

  public async executa(): Promise<any[]> {
    const listaBairros = await this.repositorioBairro.find({
      select: ['codigo_bairro', 'codigo_municipio', 'nome', 'status'],
      relations: ['codigo_municipio'],
    });

    const listaRetorno = listaBairros.map(bairro => {
      return {
        codigoBairro: bairro.codigo_bairro,
        codigoMunicipio: bairro.codigo_municipio,
        nome: bairro.nome,
        status: bairro.status,
      };
    });

    return listaRetorno.sort(
      (bairroAtual, bairroProximo) =>
        bairroProximo.codigoBairro - bairroAtual.codigoBairro,
    );
  }

  public async executaConsultaPersonalizada(params: any): Promise<Bairro[]> {
    let query = this.repositorioBairro.createQueryBuilder('tb_bairro');

    if (
      !params.codigoBairro &&
      !params.codigoMunicipio &&
      !params.nome &&
      params.status
    ) {
      query = query.andWhere('tb_bairro.status = :status', {
        status: params.status,
      });

      return (await query.getMany()).sort(
        (bairroAtual, bairroProximo) =>
          bairroProximo.codigo_bairro - bairroAtual.codigo_bairro,
      );
    }

    if (params.codigoBairro) {
      query = query.where('tb_bairro.codigo_bairro = :codigoBairro', {
        codigoBairro: params.codigoBairro,
      });
    }

    if (params.codigoMunicipio) {
      query = query.where('tb_bairro.codigo_municipio = :codigoMunicipio', {
        codigoMunicipio: params.codigoMunicipio,
      });
    }

    if (params.nome) {
      query = query.andWhere('UPPER(tb_bairro.nome) = :nome', {
        nome: params.nome.toUpperCase(),
      });
    }

    if (params.status) {
      query = query.andWhere('tb_bairro.status = :status', {
        status: params.status,
      });
    }

    return (await query.getMany()).sort(
      (bairroAtual, bairroProximo) =>
        bairroProximo.codigo_bairro - bairroAtual.codigo_bairro,
    );
  }
}

export default ServicoListarBairros;
