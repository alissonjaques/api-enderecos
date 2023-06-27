import { getCustomRepository } from 'typeorm';
import { RepositorioBairro } from '../typeorm/repositorios/RepositorioBairro';
import existeBairro from '../validacoes/delete/existeBairro';

interface IRequest {
  codigoBairro: number;
}

class ServicoDeletarBairro {
  public async execute({ codigoBairro }: IRequest): Promise<void> {
    const repositorioBairro = getCustomRepository(RepositorioBairro);

    const bairro = await existeBairro(
      codigoBairro,
      repositorioBairro,
      'deletar',
    );

    bairro.status = 2;
    await repositorioBairro.save(bairro);
  }
}

export default ServicoDeletarBairro;
