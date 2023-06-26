import { getCustomRepository } from 'typeorm';
import { RepositorioEndereco } from '../typeorm/repositorios/RepositorioEndereco';
import existeEndereco from '../validacoes/delete/existeEndereco';

interface IRequest {
  codigo_endereco: number;
}

class ServicoDeletarEndereco {
  public async execute({ codigo_endereco }: IRequest): Promise<void> {
    const repositorioEndereco = getCustomRepository(RepositorioEndereco);

    const endereco = await existeEndereco(
      codigo_endereco,
      repositorioEndereco,
      'deletar',
    );

    await repositorioEndereco.delete(endereco);
  }
}

export default ServicoDeletarEndereco;
