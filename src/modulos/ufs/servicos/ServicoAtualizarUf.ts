import { RepositorioUf } from '../typeorm/repositorios/RepositorioUf';
import Uf from '../typeorm/entidades/Uf';
import ServicoListarUfs from './ServicoListarUfs';
import { getCustomRepository } from 'typeorm';
import ValidacoesAtualizar from '../validacoes/put/ValidacoesAtualizar';
import existeUf from '../validacoes/delete/existeUf';
import AppErros from '@compartilhado/erros/AppErros';

interface IRequest {
  codigoUF: number;
  sigla: string;
  nome: string;
  status: number;
}

class ServicoAtualizarUf {
  public async executa({
    codigoUF,
    sigla,
    nome,
    status,
  }: IRequest): Promise<Uf[]> {
    const repositorioUf = getCustomRepository(RepositorioUf);

    if (!codigoUF) {
      throw new AppErros(
        `Não foi possível atualizar o UF no banco de dados. Motivo: o campo codigoUF é obrigatório`,
      );
    }

    const uf = await existeUf(codigoUF, repositorioUf, 'atualizar');

    const validacoes = new ValidacoesAtualizar();
    await validacoes.validar({ codigoUF, sigla, nome, status }, uf);

    uf.nome = nome;
    uf.sigla = sigla;
    uf.status = status;

    await repositorioUf.save(uf);

    const servicoListarUfs = new ServicoListarUfs();
    return await servicoListarUfs.executa();
  }
}

export default ServicoAtualizarUf;
