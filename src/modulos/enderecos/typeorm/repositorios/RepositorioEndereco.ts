import { EntityRepository, Repository } from 'typeorm';
import Endereco from '../entidades/Endereco';

@EntityRepository(Endereco)
export class RepositorioEndereco extends Repository<Endereco> {
  public async encontrarPorCodigoPessoa(
    codigo_pessoa: number,
  ): Promise<Endereco> {
    let construtorDeConsultas = this.createQueryBuilder('tb_endereco');

    construtorDeConsultas = construtorDeConsultas.where(
      'tb_endereco.codigo_pessoa = :codigo_pessoa',
      {
        codigo_pessoa: codigo_pessoa,
      },
    );

    const listaEnderecos = await construtorDeConsultas.getMany();
    return listaEnderecos[0];
  }
}
