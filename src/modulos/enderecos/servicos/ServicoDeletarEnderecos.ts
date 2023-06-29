import { getCustomRepository } from 'typeorm';
import { RepositorioEndereco } from '../typeorm/repositorios/RepositorioEndereco';
import existeEndereco from '../validacoes/delete/existeEndereco';

interface IRequest {
  enderecos: any[];
}

class ServicoDeletarEnderecos {
  public async execute({ enderecos }: IRequest): Promise<void> {
    const repositorioEndereco = getCustomRepository(RepositorioEndereco);

    // valida todos os enderecos
    for (let i = 0; i < enderecos.length; i++) {
      const endereco = enderecos[i];
      await existeEndereco(
        endereco.codigoEndereco,
        repositorioEndereco,
        'deletar',
      );
    }

    // deleta todos os enderecos
    for (let i = 0; i < enderecos.length; i++) {
      const endereco = enderecos[i];
      await repositorioEndereco.delete(endereco);
    }
  }
}

export default ServicoDeletarEnderecos;
