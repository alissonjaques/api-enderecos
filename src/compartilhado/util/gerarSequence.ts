import { getManager } from 'typeorm';

async function gerarSequence(sequence: string): Promise<number> {
  const entityManager = getManager();
  const consulta = `SELECT ${sequence.toUpperCase()}.NEXTVAL as CODIGO FROM DUAL`;
  const resultado = await entityManager.query(consulta);
  const proximoValor = resultado[0].CODIGO;

  return proximoValor;
}

export default gerarSequence;
