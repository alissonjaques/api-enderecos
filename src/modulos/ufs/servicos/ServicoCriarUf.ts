import { getCustomRepository } from 'typeorm';
import { RepositorioUf } from '../typeorm/repositorios/RepositorioUf';
import Uf from '../typeorm/entidades/Uf';
import ServicoListarUfs from './ServicoListarUfs';
import ValidacoesCadastrar from '../validacoes/post/ValidacoesCadastrar';
import gerarSequence from '@compartilhado/util/gerarSequence';

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

    const codigo_uf = await gerarSequence('sequence_uf');
    const uf = repositorioUf.create({ codigo_uf, sigla, nome, status });
    await repositorioUf.save(uf);

    const servicoListarUfs = new ServicoListarUfs();
    return await servicoListarUfs.executa();
  }
}

export default ServicoCriarUf;
