import { getCustomRepository, getManager } from 'typeorm';
import Municipio from '../typeorm/entidades/Municipio';
import ServicoListarMunicipios from './ServicoListarMunicipios';
import ValidacoesCadastrar from '../validacoes/post/ValidacoesCadastrar';
import { RepositorioMunicipio } from '../typeorm/repositorios/RepositorioMunicipio';

interface IRequest {
  codigo_uf: number;
  nome: string;
  status: number;
}

class ServicoCriarMunicipio {
  public async executa({
    codigo_uf,
    nome,
    status,
  }: IRequest): Promise<Municipio[]> {
    const repositorioMunicipio = getCustomRepository(RepositorioMunicipio);
    const validacoes = new ValidacoesCadastrar();
    await validacoes.validar({ codigo_uf, nome, status });
    const codigo_municipio = await getSequence();
    const municipio = repositorioMunicipio.create({
      codigo_municipio,
      codigo_uf: { codigo_uf: codigo_uf },
      nome,
      status,
    });

    await repositorioMunicipio.save(municipio);

    const servicoListarMunicipios = new ServicoListarMunicipios();
    return await servicoListarMunicipios.executa();
  }
}

async function getSequence(): Promise<number> {
  const entityManager = getManager();
  const consulta = 'SELECT SEQUENCE_MUNICIPIO.NEXTVAL as CODIGO FROM DUAL';
  const resultado = await entityManager.query(consulta);
  const proximoValor = resultado[0].CODIGO;
  return proximoValor;
}

export default ServicoCriarMunicipio;
