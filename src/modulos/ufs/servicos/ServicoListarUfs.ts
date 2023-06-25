import { EntityManager, getManager } from 'typeorm';
import Uf from '../typeorm/entidades/Uf';

class ServicoListarUfs {
  private readonly entityManager: EntityManager;
  private consulta: string;

  constructor() {
    this.entityManager = getManager();
    this.consulta = '';
  }

  public async executa(): Promise<Uf[]> {
    this.consulta = `SELECT CODIGO_UF AS "codigoUF",
                     SIGLA AS "sigla",
                     NOME AS "nome",
                     STATUS as "status"
                     FROM TB_UF
                     ORDER BY CODIGO_UF DESC`;

    const resultadoConsulta = await this.entityManager.query(this.consulta);

    return resultadoConsulta;
  }

  public async executaConsultaPersonalizada(params: any): Promise<Uf[]> {
    this.consulta = `SELECT CODIGO_UF AS "codigoUF",
                     SIGLA AS "sigla",
                     NOME AS "nome",
                     STATUS as "status"
                     FROM TB_UF WHERE `;

    if (!params.codigoUF && !params.sigla && !params.nome && params.status) {
      this.consulta += `TB_UF.STATUS = ${params.status}
                        ORDER BY CODIGO_UF DESC`;

      const resultadoConsulta = await this.entityManager.query(this.consulta);

      return resultadoConsulta;
    }

    if (params.codigoUF) {
      this.consulta += `TB_UF.CODIGO_UF = ${params.codigoUF} `;
    }

    if (params.sigla) {
      params.codigoUF
        ? (this.consulta += `AND UPPER(TB_UF.SIGLA) = '${params.sigla.toUpperCase()}' `)
        : (this.consulta += `UPPER(TB_UF.SIGLA) = '${params.sigla.toUpperCase()}' `);
    }

    if (params.nome) {
      params.codigoUF || params.sigla
        ? (this.consulta += `AND UPPER(TB_UF.NOME) = '${params.nome.toUpperCase()}' `)
        : (this.consulta += `UPPER(TB_UF.NOME) = '${params.nome.toUpperCase()}' `);
    }

    if (params.status) {
      params.nome || params.sigla || params.codigoUF
        ? (this.consulta += `AND TB_UF.STATUS = ${params.status} `)
        : (this.consulta += `TB_UF.STATUS = ${params.status} `);
    }

    this.consulta += 'ORDER BY TB_UF.CODIGO_UF DESC';
    const resultadoConsulta = await this.entityManager.query(this.consulta);

    return resultadoConsulta;
  }
}

export default ServicoListarUfs;
