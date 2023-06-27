import { EntityManager, getManager } from 'typeorm';
import Endereco from '../typeorm/entidades/Endereco';

class ServicoListarEnderecos {
  private readonly entityManager: EntityManager;
  private consulta: string;

  constructor() {
    this.entityManager = getManager();
    this.consulta = '';
  }

  public async executa(codigoPessoa: number): Promise<Endereco[]> {
    this.consulta = `SELECT CODIGO_ENDERECO AS "codigoEndereco",
                     CODIGO_PESSOA AS "codigoPessoa",
                     CODIGO_BAIRRO AS "codigoBairro",
                     NOME_RUA AS "nomeRua",
                     NUMERO AS "numero",
                     COMPLEMENTO AS "complemento",
                     CEP AS "cep"
                     FROM TB_ENDERECO
                     WHERE CODIGO_PESSOA = ${codigoPessoa}
                     ORDER BY CODIGO_ENDERECO DESC`;

    const resultadoConsulta = await this.entityManager.query(this.consulta);

    return resultadoConsulta;
  }
}

export default ServicoListarEnderecos;
