import { getCustomRepository } from 'typeorm';
import { RepositorioPessoa } from '../typeorm/repositorios/RepositorioPessoa';
import existePessoa from '../validacoes/delete/existePessoa';

interface IRequest {
  codigoPessoa: number;
}

class ServicoDeletarPessoa {
  public async execute({ codigoPessoa }: IRequest): Promise<void> {
    const repositorioPessoa = getCustomRepository(RepositorioPessoa);
    const pessoa = await existePessoa(
      codigoPessoa,
      repositorioPessoa,
      'deletar',
    );

    pessoa.status = 2;
    await repositorioPessoa.save(pessoa);
  }
}

export default ServicoDeletarPessoa;
