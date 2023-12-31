import { EntityManager, getCustomRepository, getManager } from 'typeorm';
import Pessoa from '../typeorm/entidades/Pessoa';
import { RepositorioPessoa } from '../typeorm/repositorios/RepositorioPessoa';

class ServicoListarPessoas {
  private readonly entityManager: EntityManager;
  private consulta: string;

  constructor() {
    this.entityManager = getManager();
    this.consulta = '';
  }

  public async executa(): Promise<Pessoa[]> {
    this.consulta = `SELECT CODIGO_PESSOA AS "codigoPessoa",
                     NOME AS "nome",
                     SOBRENOME AS "sobrenome",
                     IDADE as "idade",
                     LOGIN as "login",
                     SENHA as "senha",
                     STATUS as "status"
                     FROM TB_PESSOA
                     ORDER BY CODIGO_PESSOA DESC`;

    const resultadoConsulta = await this.entityManager.query(this.consulta);

    return resultadoConsulta;
  }

  public async consultarDetalhamentoPessoa(
    codigoPessoa: number,
  ): Promise<Pessoa | undefined> {
    const repositorioPessoa = getCustomRepository(RepositorioPessoa);
    const pessoa = await repositorioPessoa.findOne(codigoPessoa, {
      relations: [
        'enderecos',
        'enderecos.bairro',
        'enderecos.bairro.municipio',
        'enderecos.bairro.municipio.uf',
      ],
    });

    if (pessoa && pessoa.enderecos) {
      pessoa.enderecos.sort(
        (enderecoAtual, enderecoProximo) =>
          enderecoProximo.codigoEndereco - enderecoAtual.codigoEndereco,
      );
    }

    return pessoa;
  }

  public async executaConsultaPersonalizada(params: any): Promise<Pessoa[]> {
    this.consulta = `SELECT CODIGO_PESSOA AS "codigoPessoa",
                     NOME AS "nome",
                     SOBRENOME AS "sobrenome",
                     IDADE as "idade",
                     LOGIN as "login",
                     SENHA as "senha",
                     STATUS as "status"
                     FROM TB_PESSOA WHERE `;

    if (
      !params.codigoPessoa &&
      params.login &&
      !params.status &&
      !params.idade &&
      !params.nome &&
      !params.sobrenome
    ) {
      this.consulta += `UPPER(TB_PESSOA.LOGIN) = '${params.login.toUpperCase()}'
                        ORDER BY CODIGO_PESSOA DESC`;

      const resultadoConsulta = await this.entityManager.query(this.consulta);

      return resultadoConsulta;
    }

    if (
      !params.codigoPessoa &&
      !params.login &&
      params.status &&
      !params.idade &&
      !params.nome &&
      !params.sobrenome
    ) {
      this.consulta += `TB_PESSOA.STATUS = ${params.status}
                        ORDER BY CODIGO_PESSOA DESC`;

      const resultadoConsulta = await this.entityManager.query(this.consulta);

      return resultadoConsulta;
    }

    if (
      !params.codigoPessoa &&
      !params.login &&
      !params.status &&
      params.idade &&
      !params.nome &&
      !params.sobrenome
    ) {
      this.consulta += `TB_PESSOA.IDADE = ${params.idade}
                        ORDER BY CODIGO_PESSOA DESC`;

      const resultadoConsulta = await this.entityManager.query(this.consulta);

      return resultadoConsulta;
    }

    if (
      !params.codigoPessoa &&
      !params.login &&
      !params.status &&
      !params.idade &&
      params.nome &&
      !params.sobrenome
    ) {
      this.consulta += `UPPER(TB_PESSOA.NOME) = '${params.nome.toUpperCase()}'
                        ORDER BY CODIGO_PESSOA DESC`;

      const resultadoConsulta = await this.entityManager.query(this.consulta);

      return resultadoConsulta;
    }

    if (
      !params.codigoPessoa &&
      !params.login &&
      !params.status &&
      !params.idade &&
      !params.nome &&
      params.sobrenome
    ) {
      this.consulta += `UPPER(TB_PESSOA.SOBRENOME) = '${params.sobrenome.toUpperCase()}'
                        ORDER BY CODIGO_PESSOA DESC`;

      const resultadoConsulta = await this.entityManager.query(this.consulta);

      return resultadoConsulta;
    }

    if (params.codigoPessoa) {
      this.consulta += `TB_PESSOA.CODIGO_PESSOA = ${params.codigoPessoa} `;
    }

    if (params.login) {
      params.codigoPessoa
        ? (this.consulta += `AND UPPER(TB_PESSOA.LOGIN) = '${params.login.toUpperCase()}' `)
        : (this.consulta += `UPPER(TB_PESSOA.LOGIN) = '${params.login.toUpperCase()}' `);
    }

    if (params.status) {
      params.login || params.codigoPessoa
        ? (this.consulta += `AND TB_PESSOA.STATUS = ${params.status} `)
        : (this.consulta += `TB_PESSOA.STATUS = ${params.status} `);
    }

    if (params.idade) {
      params.status || params.login || params.codigoPessoa
        ? (this.consulta += `AND TB_PESSOA.IDADE = ${params.idade} `)
        : (this.consulta += `TB_PESSOA.IDADE = ${params.idade} `);
    }

    if (params.nome) {
      params.idade || params.status || params.login || params.codigoPessoa
        ? (this.consulta += `AND UPPER(TB_PESSOA.NOME) = '${params.nome.toUpperCase()}' `)
        : (this.consulta += `UPPER(TB_PESSOA.NOME) = '${params.nome.toUpperCase()}' `);
    }

    if (params.sobrenome) {
      params.nome ||
      params.idade ||
      params.status ||
      params.login ||
      params.codigoPessoa
        ? (this.consulta += `AND UPPER(TB_PESSOA.SOBRENOME) = '${params.sobrenome.toUpperCase()}' `)
        : (this.consulta += `UPPER(TB_PESSOA.SOBRENOME) = '${params.sobrenome.toUpperCase()}' `);
    }

    this.consulta += 'ORDER BY TB_PESSOA.CODIGO_PESSOA DESC';
    const resultadoConsulta = await this.entityManager.query(this.consulta);

    return resultadoConsulta;
  }
}

export default ServicoListarPessoas;
