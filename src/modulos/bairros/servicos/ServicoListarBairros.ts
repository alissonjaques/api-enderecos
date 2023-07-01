import { EntityManager, getManager } from 'typeorm';
import Bairro from '../typeorm/entidades/Bairro';

class ServicoListarBairros {
  private readonly entityManager: EntityManager;
  private consulta: string;

  constructor() {
    this.entityManager = getManager();
    this.consulta = '';
  }

  public async executa(): Promise<Bairro[]> {
    this.consulta = `SELECT CODIGO_BAIRRO AS "codigoBairro",
                     CODIGO_MUNICIPIO AS "codigoMunicipio",
                     NOME AS "nome",
                     STATUS as "status"
                     FROM TB_BAIRRO
                     ORDER BY CODIGO_BAIRRO DESC`;

    const resultadoConsulta = await this.entityManager.query(this.consulta);

    return resultadoConsulta;
  }

  public async executaConsultaPersonalizada(params: any): Promise<Bairro[]> {
    this.consulta = `SELECT CODIGO_BAIRRO AS "codigoBairro",
                     CODIGO_MUNICIPIO AS "codigoMunicipio",
                     NOME AS "nome",
                     STATUS as "status"
                     FROM TB_BAIRRO WHERE `;
    if (
      !params.codigoBairro &&
      params.codigoMunicipio &&
      !params.nome &&
      !params.status
    ) {
      this.consulta += `CODIGO_MUNICIPIO = ${params.codigoMunicipio}
                        ORDER BY CODIGO_BAIRRO DESC`;

      const resultadoConsulta = await this.entityManager.query(this.consulta);
      return resultadoConsulta;
    }

    if (
      !params.codigoBairro &&
      !params.codigoMunicipio &&
      params.nome &&
      !params.status
    ) {
      this.consulta += `UPPER(TB_BAIRRO.NOME) = '${params.nome.toUpperCase()}'
                        ORDER BY CODIGO_BAIRRO DESC`;

      const resultadoConsulta = await this.entityManager.query(this.consulta);
      return resultadoConsulta;
    }

    if (
      !params.codigoBairro &&
      !params.codigoMunicipio &&
      !params.nome &&
      params.status
    ) {
      this.consulta += `STATUS = ${params.status}
                        ORDER BY CODIGO_BAIRRO DESC`;

      const resultadoConsulta = await this.entityManager.query(this.consulta);
      return resultadoConsulta;
    }

    if (params.codigoBairro) {
      this.consulta += `TB_BAIRRO.CODIGO_BAIRRO = ${params.codigoBairro} `;
    }

    if (params.codigoMunicipio) {
      params.codigoBairro
        ? (this.consulta += `AND TB_BAIRRO.CODIGO_MUNICIPIO = ${params.codigoMunicipio} `)
        : (this.consulta += `TB_BAIRRO.CODIGO_MUNICIPIO = ${params.codigoMunicipio} `);
    }

    if (params.nome) {
      params.codigoMunicipio || params.codigoBairro
        ? (this.consulta += `AND UPPER(TB_BAIRRO.NOME) = '${params.nome.toUpperCase()}' `)
        : (this.consulta += `UPPER(TB_BAIRRO.NOME) = '${params.nome.toUpperCase()}' `);
    }

    if (params.status) {
      params.nome || params.codigoMunicipio || params.codigoBairro
        ? (this.consulta += `AND TB_BAIRRO.STATUS = ${params.status} `)
        : (this.consulta += `TB_BAIRRO.STATUS = ${params.status} `);
    }

    this.consulta += 'ORDER BY TB_BAIRRO.CODIGO_BAIRRO DESC';

    const resultadoConsulta = await this.entityManager.query(this.consulta);

    return resultadoConsulta;
  }
}

export default ServicoListarBairros;
