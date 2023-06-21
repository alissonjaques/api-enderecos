import { EntityRepository, Repository } from 'typeorm';
import Uf from '../entidades/Uf';

@EntityRepository(Uf)
export class RepositorioUf extends Repository<Uf> {
  public async encontrarPorNome(nome: string): Promise<Uf | undefined> {
    const uf = this.findOne({
      where: { nome },
    });

    return uf;
  }

  public async encontrarPorSigla(sigla: string): Promise<Uf | undefined> {
    const uf = this.findOne({
      where: { sigla },
    });

    return uf;
  }
}
