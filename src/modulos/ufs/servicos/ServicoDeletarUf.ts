import { getCustomRepository } from 'typeorm';
import { RepositorioUf } from '../typeorm/repositorios/RepositorioUf';
import existeUf from '../validacoes/delete/existeUf';
import validarUfEstaEmUso from '../validacoes/geral/validarUfEstaEmUso';

interface IRequest {
  codigoUF: number;
}

class ServicoDeletarUf {
  public async execute({ codigoUF }: IRequest): Promise<void> {
    const repositorioUf = getCustomRepository(RepositorioUf);
    const uf = await existeUf(codigoUF, repositorioUf, 'deletar');
    await validarUfEstaEmUso(codigoUF, 2, 'deletar');
    await repositorioUf.delete(uf);
  }
}

export default ServicoDeletarUf;
