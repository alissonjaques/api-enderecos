import { EntityRepository, Repository } from 'typeorm';
import Pessoa from '../entidades/Pessoa';

@EntityRepository(Pessoa)
export class RepositorioPessoa extends Repository<Pessoa> {
  public async encontrarPorLogin(login: string): Promise<Pessoa> {
    let construtorDeConsultas = this.createQueryBuilder('tb_pessoa');

    construtorDeConsultas = construtorDeConsultas.andWhere(
      'UPPER(tb_pessoa.login) = :login',
      {
        login: login.toUpperCase(),
      },
    );

    const listaPessoas = await construtorDeConsultas.getMany();
    return listaPessoas[0];
  }
}
