import { getCustomRepository } from 'typeorm';
import { RepositorioPessoa } from '../typeorm/repositorios/RepositorioPessoa';
import existePessoa from '../validacoes/delete/existePessoa';

interface IRequest {
  codigo_pessoa: number;
}

class ServicoDeletarPessoa {
  public async execute({ codigo_pessoa }: IRequest): Promise<void> {
    const repositorioPessoa = getCustomRepository(RepositorioPessoa);
    const pessoa = await existePessoa(
      codigo_pessoa,
      repositorioPessoa,
      'deletar',
    );

    pessoa.status = 2;
    await repositorioPessoa.save(pessoa);
  }
}

export default ServicoDeletarPessoa;
