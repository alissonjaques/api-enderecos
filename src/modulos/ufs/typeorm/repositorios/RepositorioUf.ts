import { EntityRepository, Repository } from 'typeorm';
import Uf from '../entidades/Uf';

@EntityRepository(Uf)
export class RepositorioUf extends Repository<Uf> {
  public async encontrarPorNome(nome: string): Promise<Uf | undefined> {
    let construtorDeConsultas = this.createQueryBuilder('tb_uf');

    construtorDeConsultas = construtorDeConsultas.andWhere(
      'UPPER(tb_uf.nome) = :nome',
      {
        nome: nome.toUpperCase(),
      },
    );

    const listaUfs = await construtorDeConsultas.getMany();
    return listaUfs[0];
  }

  public async encontrarPorSigla(sigla: string): Promise<Uf | undefined> {
    let construtorDeConsultas = this.createQueryBuilder('tb_uf');

    construtorDeConsultas = construtorDeConsultas.andWhere(
      'UPPER(tb_uf.sigla) = :sigla',
      {
        sigla: sigla.toUpperCase(),
      },
    );

    const listaUfs = await construtorDeConsultas.getMany();
    return listaUfs[0];
  }
}
