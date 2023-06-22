import { EntityRepository, Repository } from 'typeorm';
import Municipio from '../entidades/Municipio';

@EntityRepository(Municipio)
export class RepositorioMunicipio extends Repository<Municipio> {
  public async encontrarPorNome(nome: string): Promise<Municipio> {
    let construtorDeConsultas = this.createQueryBuilder('tb_municipio');

    construtorDeConsultas = construtorDeConsultas.andWhere(
      'UPPER(tb_municipio.nome) = :nome',
      {
        nome: nome.toUpperCase(),
      },
    );

    const listaMunicipios = await construtorDeConsultas.getMany();
    return listaMunicipios[0];
  }
}
