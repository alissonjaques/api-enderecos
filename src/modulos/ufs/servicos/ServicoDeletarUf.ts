import { getCustomRepository } from 'typeorm';
import { RepositorioUf } from '../typeorm/repositorios/RepositorioUf';
import existeUf from '../validacoes/delete/existeUf';

interface IRequest {
  codigo_uf: number;
}

class ServicoDeletarUf {
  public async execute({ codigo_uf }: IRequest): Promise<void> {
    const repositorioUf = getCustomRepository(RepositorioUf);
    const uf = await existeUf(codigo_uf, repositorioUf, 'deletar');

    uf.status = 2;
    await repositorioUf.save(uf);
  }
}

export default ServicoDeletarUf;
