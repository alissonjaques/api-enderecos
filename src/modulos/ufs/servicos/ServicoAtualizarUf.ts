import { RepositorioUf } from '../typeorm/repositorios/RepositorioUf';
import Uf from '../typeorm/entidades/Uf';
import ServicoListarUfs from './ServicoListarUfs';
import { getCustomRepository } from 'typeorm';
import ValidacoesAtualizar from '../validacoes/put/ValidacoesAtualizar';
import existeUf from '../validacoes/delete/existeUf';

interface IRequest {
  codigo_uf: number;
  sigla: string;
  nome: string;
  status: number;
}

class ServicoAtualizarUf {
  public async executa({
    codigo_uf,
    sigla,
    nome,
    status,
  }: IRequest): Promise<Uf[]> {
    const repositorioUf = getCustomRepository(RepositorioUf);
    const uf = await existeUf(codigo_uf, repositorioUf, 'atualizar');

    const validacoes = new ValidacoesAtualizar();
    await validacoes.validar({ codigo_uf, sigla, nome, status }, uf);

    uf.nome = nome;
    uf.sigla = sigla;
    uf.status = status;

    await repositorioUf.save(uf);

    const servicoListarUfs = new ServicoListarUfs();
    const ufs = await servicoListarUfs.executa();
    return ufs;
  }
}

export default ServicoAtualizarUf;
