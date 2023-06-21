import { getCustomRepository, getManager } from 'typeorm';
import { RepositorioUf } from '../typeorm/repositorios/RepositorioUf';
import Uf from '../typeorm/entidades/Uf';
import AppErros from '@compartilhado/erros/AppErros';

interface IRequest {
  sigla: string;
  nome: string;
  status: number;
}

class ServicoCriarUf {
  public async execute({ sigla, nome, status }: IRequest): Promise<Uf> {
    const repositorioUf = getCustomRepository(RepositorioUf);
    const siglaEhNumero = Number(sigla);
    console.log(siglaEhNumero);
    const existeUfComNomeJaCadastrado = await repositorioUf.findByName(nome);
    if (existeUfComNomeJaCadastrado) {
      throw new AppErros(
        `Não foi possível criar UF.
        <br>Já existe uma Unidade Federativa com o nome = ${nome} cadastrada no sistema.`,
      );
    }

    const codigo_uf = await getSequence();
    const uf = repositorioUf.create({ codigo_uf, sigla, nome, status });

    await repositorioUf.save(uf);

    return uf;
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
