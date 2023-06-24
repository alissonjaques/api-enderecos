import { getCustomRepository } from 'typeorm';
import Uf from '../typeorm/entidades/Uf';
import { RepositorioUf } from '../typeorm/repositorios/RepositorioUf';

class ServicoListarUfs {
  private readonly repositorioUf: RepositorioUf;

  constructor() {
    this.repositorioUf = getCustomRepository(RepositorioUf);
  }

  public async executa(): Promise<Uf[]> {
    const ufs = this.repositorioUf.find();
    return (await ufs).sort(
      (atualUf, proximoUf) => proximoUf.codigo_uf - atualUf.codigo_uf,
    );
  }

  public async executaConsultaPersonalizada(params: any): Promise<Uf[]> {
    let query = this.repositorioUf.createQueryBuilder('tb_uf');

    if (!params.codigoUF && !params.sigla && !params.nome && params.status) {
      query = query.where('tb_uf.status = :status', {
        status: params.status,
      });
      return (await query.getMany()).sort(
        (atualUf, proximoUf) => proximoUf.codigo_uf - atualUf.codigo_uf,
      );
    }

    if (params.codigoUF) {
      query = query.where('tb_uf.codigo_uf = :codigoUF', {
        codigoUF: params.codigoUF,
      });
    }

    if (params.sigla) {
      query = query.andWhere('UPPER(tb_uf.sigla) = :sigla', {
        sigla: params.sigla.toUpperCase(),
      });
    }

    if (params.nome) {
      query = query.andWhere('UPPER(tb_uf.nome) = :nome', {
        nome: params.nome.toUpperCase(),
      });
    }

    if (params.status) {
      query = query.andWhere('tb_uf.status = :status', {
        status: params.status,
      });
    }

    return (await query.getMany()).sort(
      (atualUf, proximoUf) => proximoUf.codigo_uf - atualUf.codigo_uf,
    );
  }
}

export default ServicoListarUfs;
