import { EntityRepository, Repository } from 'typeorm';
import Endereco from '../entidades/Endereco';

@EntityRepository(Endereco)
export class RepositorioEndereco extends Repository<Endereco> {
  public async encontrarPorCodigoPessoa(
    codigoPessoa: number,
  ): Promise<Endereco[]> {
    let construtorDeConsultas = this.createQueryBuilder('tb_endereco');

    construtorDeConsultas = construtorDeConsultas.where(
      'tb_endereco.pessoa.codigoPessoa = :codigo_pessoa',
      {
        codigo_pessoa: codigoPessoa,
      },
    );

    const listaEnderecos = await construtorDeConsultas.getMany();
    return listaEnderecos;
  }

  public async encontrarPorCodigoEnderecoECodigoPessoa(
    codigoEndereco: number,
    codigoPessoa: number,
  ): Promise<Endereco[]> {
    let construtorDeConsultas = this.createQueryBuilder('tb_endereco');

    construtorDeConsultas = construtorDeConsultas.where(
      'tb_endereco.pessoa.codigoPessoa = :codigo_pessoa',
      {
        codigo_pessoa: codigoPessoa,
      },
    );

    construtorDeConsultas = construtorDeConsultas.andWhere(
      'tb_endereco.codigoEndereco = :codigo_endereco',
      {
        codigo_endereco: codigoEndereco,
      },
    );

    const listaEnderecos = await construtorDeConsultas.getMany();
    return listaEnderecos;
  }

  public async encontrarPorCodigoBairro(
    codigoBairro: number,
  ): Promise<Endereco[]> {
    let construtorDeConsultas = this.createQueryBuilder('tb_endereco');

    construtorDeConsultas = construtorDeConsultas.where(
      'tb_endereco.bairro.codigoBairro = :codigo_bairro',
      {
        codigo_bairro: codigoBairro,
      },
    );

    const listaEnderecos = await construtorDeConsultas.getMany();
    return listaEnderecos;
  }
}
