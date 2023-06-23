import { EntityRepository, Repository } from 'typeorm';
import Bairro from '../entidades/Bairro';

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
      'UPPER(tb_bairro.codigo_municipio) = :codigo_municipio',
      {
        codigo_municipio: codigo_municipio,
      },
    );

    const listaBairros = await construtorDeConsultas.getMany();
    return listaBairros[0];
  }
}
