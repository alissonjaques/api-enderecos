import { getCustomRepository } from 'typeorm';
import { RepositorioUf } from '../typeorm/repositorios/RepositorioUf';
import existeUf from '../validacoes/delete/existeUf';

interface IRequest {
  codigoUF: number;
}

class ServicoDeletarUf {
  public async execute({ codigoUF }: IRequest): Promise<void> {
    const repositorioUf = getCustomRepository(RepositorioUf);
    const uf = await existeUf(codigoUF, repositorioUf, 'deletar');

    uf.status = 2;
    await repositorioUf.save(uf);
  }
}

export default ServicoDeletarUf;
