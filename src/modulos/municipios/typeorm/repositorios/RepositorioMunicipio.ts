import { EntityRepository, Repository, getCustomRepository } from 'typeorm';
import Municipio from '../entidades/Municipio';
import { RepositorioBairro } from '@modules/bairros/typeorm/repositorios/RepositorioBairro';

@EntityRepository(Municipio)
export class RepositorioMunicipio extends Repository<Municipio> {
  public async encontrarPorNome(nome: string): Promise<Municipio> {
    let construtorDeConsultas = this.createQueryBuilder('tb_municipio');

    construtorDeConsultas = construtorDeConsultas.where(
      'UPPER(tb_municipio.nome) = :nome',
      {
        nome: nome.toUpperCase(),
      },
    );

    const listaMunicipios = await construtorDeConsultas.getMany();
    return listaMunicipios[0];
  }

  public async encontrarPorNomeEUf(
    codigoUF: number,
    nome: string,
  ): Promise<Municipio> {
    let construtorDeConsultas = this.createQueryBuilder('tb_municipio');

    construtorDeConsultas = construtorDeConsultas.where(
      'UPPER(tb_municipio.nome) = :nome',
      {
        nome: nome.toUpperCase(),
      },
    );

    construtorDeConsultas = construtorDeConsultas.andWhere(
      'tb_municipio.uf.codigoUF = :codigo_uf',
      {
        codigo_uf: codigoUF,
      },
    );

    const listaMunicipios = await construtorDeConsultas.getMany();
    return listaMunicipios[0];
  }

  public async encontrarPorCodigoUF(codigoUF: number): Promise<Municipio[]> {
    let construtorDeConsultas = this.createQueryBuilder('tb_municipio');

    construtorDeConsultas = construtorDeConsultas.where(
      'tb_municipio.uf.codigoUF = :codigo_uf',
      {
        codigo_uf: codigoUF,
      },
    );

    const listaMunicipios = await construtorDeConsultas.getMany();
    return listaMunicipios;
  }

  public async estaEmUso(codigoMunicipio: number): Promise<boolean> {
    const repositorioBairro = getCustomRepository(RepositorioBairro);
    const bairros = await repositorioBairro.encontrarPorCodigoMunicipio(
      codigoMunicipio,
    );
    return Object.keys(bairros).length !== 0 ? true : false;
  }
}
