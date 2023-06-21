import { EntityRepository, Repository } from 'typeorm';
import Uf from '../entidades/Uf';

@EntityRepository(Uf)
export class RepositorioUf extends Repository<Uf> {
  public async findByName(nome: string): Promise<Uf | undefined> {
    const uf = this.findOne({
      where: { nome },
    });

    return uf;
  }
}
