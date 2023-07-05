import { EntityRepository, Repository, getCustomRepository } from 'typeorm';
import Bairro from '../entidades/Bairro';
import { RepositorioEndereco } from '@modules/enderecos/typeorm/repositorios/RepositorioEndereco';

@EntityRepository(Bairro)
export class RepositorioBairro extends Repository<Bairro> {
  public async encontrarPorNome(nome: string): Promise<Bairro> {
    let construtorDeConsultas = this.createQueryBuilder('tb_bairro');

    construtorDeConsultas = construtorDeConsultas.where(
      'UPPER(tb_bairro.nome) = :nome',
      {
        nome: nome.toUpperCase(),
      },
    );

    const listaBairros = await construtorDeConsultas.getMany();
    return listaBairros[0];
  }

  public async encontrarPorNomeEMunicipio(
    codigo_municipio: number,
    nome: string,
  ): Promise<Bairro> {
    let construtorDeConsultas = this.createQueryBuilder('tb_bairro');

    construtorDeConsultas = construtorDeConsultas.where(
      'UPPER(tb_bairro.nome) = :nome',
      {
        nome: nome.toUpperCase(),
      },
    );

    construtorDeConsultas = construtorDeConsultas.andWhere(
      'tb_bairro.municipio.codigoMunicipio = :codigo_municipio',
      {
        codigo_municipio: codigo_municipio,
      },
    );

    const listaBairros = await construtorDeConsultas.getMany();
    return listaBairros[0];
  }

  public async encontrarPorCodigoMunicipio(
    codigoMunicipio: number,
  ): Promise<Bairro[]> {
    let construtorDeConsultas = this.createQueryBuilder('tb_bairro');

    construtorDeConsultas = construtorDeConsultas.where(
      'tb_bairro.municipio.codigoMunicipio = :codigo_municipio',
      {
        codigo_municipio: codigoMunicipio,
      },
    );

    const listaBairros = await construtorDeConsultas.getMany();
    return listaBairros;
  }

  public async estaEmUso(codigoBairro: number): Promise<boolean> {
    const repositorioEndereco = getCustomRepository(RepositorioEndereco);
    const enderecos = await repositorioEndereco.encontrarPorCodigoBairro(
      codigoBairro,
    );
    return Object.keys(enderecos).length !== 0 ? true : false;
  }
}
