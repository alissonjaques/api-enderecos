import { getCustomRepository } from 'typeorm';
import Uf from '../typeorm/entidades/Uf';
import { RepositorioUf } from '../typeorm/repositorios/RepositorioUf';

class ServicoListarUfs {
  public async execute(): Promise<Uf[]> {
    const repositorioUf = getCustomRepository(RepositorioUf);
    const ufs = repositorioUf.find();
    return ufs;
  }
}

export default ServicoListarUfs;
