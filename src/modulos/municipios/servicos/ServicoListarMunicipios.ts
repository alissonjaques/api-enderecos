import { EntityManager, getManager } from 'typeorm';
import Municipio from '../typeorm/entidades/Municipio';

class ServicoListarMunicipios {
  private readonly entityManager: EntityManager;
  private consulta: string;

  constructor() {
    this.entityManager = getManager();
    this.consulta = '';
  }

  public async executa(): Promise<Municipio[]> {
    this.consulta = `SELECT CODIGO_MUNICIPIO AS "codigoMunicipio",
                     CODIGO_UF AS "codigoUF",
                     NOME AS "nome",
                     STATUS as "status"
                     FROM TB_MUNICIPIO
                     ORDER BY CODIGO_MUNICIPIO DESC`;

    const resultadoConsulta = await this.entityManager.query(this.consulta);

    return resultadoConsulta;
  }

  public async executaConsultaPersonalizada(params: any): Promise<Municipio[]> {
    this.consulta = `SELECT CODIGO_MUNICIPIO AS "codigoMunicipio",
                     CODIGO_UF AS "codigoUF",
                     NOME AS "nome",
                     STATUS as "status"
                     FROM TB_MUNICIPIO WHERE `;
    if (
      !params.codigoMunicipio &&
      params.codigoUF &&
      !params.nome &&
      !params.status
    ) {
      this.consulta += `CODIGO_UF = ${params.codigoUF}
                        ORDER BY CODIGO_MUNICIPIO DESC`;

      const resultadoConsulta = await this.entityManager.query(this.consulta);
      return resultadoConsulta;
    }

    if (
      !params.codigoMunicipio &&
      !params.codigoUF &&
      params.nome &&
      !params.status
    ) {
      this.consulta += `UPPER(TB_MUNICIPIO.NOME) = '${params.nome.toUpperCase()}'
                        ORDER BY CODIGO_MUNICIPIO DESC`;

      const resultadoConsulta = await this.entityManager.query(this.consulta);
      return resultadoConsulta;
    }

    if (
      !params.codigoMunicipio &&
      !params.codigoUF &&
      !params.nome &&
      params.status
    ) {
      this.consulta += `STATUS = ${params.status}
                        ORDER BY CODIGO_MUNICIPIO DESC`;

      const resultadoConsulta = await this.entityManager.query(this.consulta);
      return resultadoConsulta;
    }

    if (params.codigoMunicipio) {
      this.consulta += `TB_MUNICIPIO.CODIGO_MUNICIPIO = ${params.codigoMunicipio} `;
    }

    if (params.codigoUF) {
      params.codigoMunicipio
        ? (this.consulta += `AND TB_MUNICIPIO.CODIGO_UF = ${params.codigoUF} `)
        : (this.consulta += `TB_MUNICIPIO.CODIGO_UF = ${params.codigoUF} `);
    }

    if (params.nome) {
      params.codigoUF || params.codigoMunicipio
        ? (this.consulta += `AND UPPER(TB_MUNICIPIO.NOME) = '${params.nome.toUpperCase()}' `)
        : (this.consulta += `UPPER(TB_MUNICIPIO.NOME) = '${params.nome.toUpperCase()}' `);
    }

    if (params.status) {
      params.nome || params.codigoUF || params.codigoMunicipio
        ? (this.consulta += `AND TB_MUNICIPIO.STATUS = ${params.status} `)
        : (this.consulta += `TB_MUNICIPIO.STATUS = ${params.status} `);
    }

    this.consulta += 'ORDER BY TB_MUNICIPIO.CODIGO_MUNICIPIO DESC';
    const resultadoConsulta = await this.entityManager.query(this.consulta);

    return resultadoConsulta;
  }
}

export default ServicoListarMunicipios;
