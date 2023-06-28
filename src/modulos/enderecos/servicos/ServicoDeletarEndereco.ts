import { getCustomRepository } from 'typeorm';
import { RepositorioEndereco } from '../typeorm/repositorios/RepositorioEndereco';
import existeEndereco from '../validacoes/delete/existeEndereco';

interface IRequest {
  codigoEndereco: number;
}

class ServicoDeletarEndereco {
  public async execute({ codigoEndereco }: IRequest): Promise<void> {
    const repositorioEndereco = getCustomRepository(RepositorioEndereco);

    const endereco = await existeEndereco(
      codigoEndereco,
      repositorioEndereco,
      'deletar',
    );

    await repositorioEndereco.delete(endereco);
  }
}

export default ServicoDeletarEndereco;
