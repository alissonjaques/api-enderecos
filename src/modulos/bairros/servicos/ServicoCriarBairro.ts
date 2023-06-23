import { getCustomRepository, getManager } from 'typeorm';
import Bairro from '../typeorm/entidades/Bairro';
import ServicoListarBairros from './ServicoListarBairros';
import ValidacoesCadastrar from '../validacoes/post/ValidacoesCadastrar';
import { RepositorioBairro } from '../typeorm/repositorios/RepositorioBairro';

interface IRequest {
  codigo_municipio: number;
  nome: string;
  status: number;
}

class ServicoCriarBairro {
  public async executa({
    codigo_municipio,
    nome,
    status,
  }: IRequest): Promise<Bairro[]> {
    const repositorioBairro = getCustomRepository(RepositorioBairro);

    const validacoes = new ValidacoesCadastrar();
    await validacoes.validar({ codigo_municipio, nome, status });

    const codigo_bairro = await getSequence();
    const bairro = repositorioBairro.create({
      codigo_bairro,
      codigo_municipio: { codigo_municipio: codigo_municipio },
      nome,
      status,
    });

    await repositorioBairro.save(bairro);

    const servicoListarBairros = new ServicoListarBairros();
    return await servicoListarBairros.executa();
  }
}

async function getSequence(): Promise<number> {
  const entityManager = getManager();
  const consulta = 'SELECT SEQUENCE_BAIRRO.NEXTVAL as CODIGO FROM DUAL';
  const resultado = await entityManager.query(consulta);
  const proximoValor = resultado[0].CODIGO;
  return proximoValor;
}

export default ServicoCriarBairro;
