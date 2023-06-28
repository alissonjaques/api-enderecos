import { EntityRepository, Repository } from 'typeorm';
import Endereco from '../entidades/Endereco';

@EntityRepository(Endereco)
export class RepositorioEndereco extends Repository<Endereco> {
  public async encontrarPorCodigoPessoa(
    codigoPessoa: number,
  ): Promise<Endereco> {
    let construtorDeConsultas = this.createQueryBuilder('tb_endereco');

    construtorDeConsultas = construtorDeConsultas.where(
      'tb_endereco.pessoa.codigoPessoa = :codigo_pessoa',
      {
        codigo_pessoa: codigoPessoa,
      },
    );

    const listaEnderecos = await construtorDeConsultas.getMany();
    return listaEnderecos[0];
  }
}
