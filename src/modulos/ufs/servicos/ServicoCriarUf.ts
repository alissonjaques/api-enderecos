import { getCustomRepository, getManager } from 'typeorm';
import { RepositorioUf } from '../typeorm/repositorios/RepositorioUf';
import Uf from '../typeorm/entidades/Uf';
import ServicoListarUfs from './ServicoListarUfs';
import ValidacoesCadastrar from '../validacoes/post/ValidacoesCadastrar';

interface IRequest {
  sigla: string;
  nome: string;
  status: number;
}

class ServicoCriarUf {
  public async executa({ sigla, nome, status }: IRequest): Promise<Uf[]> {
    const repositorioUf = getCustomRepository(RepositorioUf);
    const validacoes = new ValidacoesCadastrar();
    await validacoes.validar({ sigla, nome, status });
    const codigo_uf = await getSequence();
    const uf = repositorioUf.create({ codigo_uf, sigla, nome, status });

    await repositorioUf.save(uf);

    const servicoListarUfs = new ServicoListarUfs();
    return await servicoListarUfs.executa();
  }
}

async function getSequence(): Promise<number> {
  const entityManager = getManager();
  const consulta = 'SELECT SEQUENCE_UF.NEXTVAL as CODIGO FROM DUAL';
  const resultado = await entityManager.query(consulta);
  const proximoValor = resultado[0].CODIGO;
  return proximoValor;
}

export default ServicoCriarUf;
