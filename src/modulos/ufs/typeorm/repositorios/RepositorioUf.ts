import { EntityRepository, Repository, getCustomRepository } from 'typeorm';
import Uf from '../entidades/Uf';
import { RepositorioMunicipio } from '@modules/municipios/typeorm/repositorios/RepositorioMunicipio';

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

  public async estaEmUso(codigoUF: number): Promise<boolean> {
    const repositorioMunicipio = getCustomRepository(RepositorioMunicipio);
    const municipios = await repositorioMunicipio.encontrarPorCodigoUF(
      codigoUF,
    );
    return Object.keys(municipios).length !== 0 ? true : false;
  }
}
