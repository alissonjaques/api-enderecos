import { getCustomRepository } from 'typeorm';
import { RepositorioBairro } from '../typeorm/repositorios/RepositorioBairro';
import existeBairro from '../validacoes/delete/existeBairro';

interface IRequest {
  codigo_bairro: number;
}

class ServicoDeletarBairro {
  public async execute({ codigo_bairro }: IRequest): Promise<void> {
    const repositorioBairro = getCustomRepository(RepositorioBairro);

    const bairro = await existeBairro(
      codigo_bairro,
      repositorioBairro,
      'deletar',
    );

    bairro.status = 2;
    await repositorioBairro.save(bairro);
  }
}

export default ServicoDeletarBairro;
