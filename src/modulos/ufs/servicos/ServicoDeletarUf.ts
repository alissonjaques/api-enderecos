import { getCustomRepository } from 'typeorm';
import { RepositorioUf } from '../typeorm/repositorios/RepositorioUf';
import AppErros from '@compartilhado/erros/AppErros';

interface IRequest {
  codigo_uf: number;
}

class ServicoDeletarUf {
  public async execute({ codigo_uf }: IRequest): Promise<void> {
    const repositorioUf = getCustomRepository(RepositorioUf);
    const uf = await repositorioUf.findOne(codigo_uf);

    if (!uf) {
      throw new AppErros(`UF com id = ${codigo_uf} não encontrada.`);
    }

    await repositorioUf.remove(uf);
  }
}

export default ServicoDeletarUf;
