import { getCustomRepository, getManager } from 'typeorm';
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
      order: {
        codigo_municipio: 'DESC',
      },
    });

    const listaDeRetorno = listaMunicipios.map(municipio => {
      return {
        codigoMunicipio: municipio.codigo_municipio,
        codigoUF: municipio.codigo_uf.codigo_uf,
        nome: municipio.nome,
        status: municipio.status,
      };
    });

    return listaDeRetorno;
  }

  public async executaConsultaPersonalizada(params: any): Promise<any[]> {
    const entityManager = getManager();
    let query = '';

    if (
      !params.codigoMunicipio &&
      !params.codigoUF &&
      !params.nome &&
      params.status
    ) {
      query = `SELECT CODIGO_MUNICIPIO AS "codigoMunicipio",
                 CODIGO_UF AS "codigoUF",
                 NOME AS "nome",
                 STATUS as "status"
                 FROM TB_MUNICIPIO WHERE STATUS = ${params.status}
                 ORDER BY CODIGO_MUNICIPIO DESC`;

      const resultadoConsulta = await entityManager.query(query);
      return resultadoConsulta;
    }

    if (
      !params.codigoMunicipio &&
      params.codigoUF &&
      !params.nome &&
      !params.status
    ) {
      query = `SELECT CODIGO_MUNICIPIO AS "codigoMunicipio",
                 CODIGO_UF AS "codigoUF",
                 NOME AS "nome",
                 STATUS as "status"
                 FROM TB_MUNICIPIO WHERE CODIGO_UF = ${params.codigoUF}
                 ORDER BY CODIGO_MUNICIPIO DESC`;

      const resultadoConsulta = await entityManager.query(query);
      return resultadoConsulta;
    }

    query = `SELECT CODIGO_MUNICIPIO AS "codigoMunicipio",
                 CODIGO_UF AS "codigoUF",
                 NOME AS "nome",
                 STATUS as "status"
                 FROM TB_MUNICIPIO WHERE `;

    if (params.codigoMunicipio) {
      query += `TB_MUNICIPIO.CODIGO_MUNICIPIO = ${params.codigoMunicipio} `;
    }

    if (params.codigoUF) {
      params.codigoMunicipio
        ? (query += `AND TB_MUNICIPIO.CODIGO_UF = ${params.codigoUF} `)
        : (query += `TB_MUNICIPIO.CODIGO_UF = ${params.codigoUF} `);
    }

    if (params.nome) {
      params.codigoUF || params.codigoMunicipio
        ? (query += `AND TB_MUNICIPIO.NOME = '${params.nome}' `)
        : (query += `TB_MUNICIPIO.NOME = '${params.nome}' `);
    }

    if (params.status) {
      params.nome || params.codigoUF || params.codigoMunicipio
        ? (query += `AND TB_MUNICIPIO.STATUS = ${params.status}`)
        : (query += `TB_MUNICIPIO.STATUS = ${params.status}`);
    }

    query += 'ORDER BY TB_MUNICIPIO.CODIGO_MUNICIPIO DESC';
    const resultadoConsulta = await entityManager.query(query);

    return resultadoConsulta;
  }
}

export default ServicoListarMunicipios;
