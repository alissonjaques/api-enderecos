import { getCustomRepository } from 'typeorm';
import Uf from '../typeorm/entidades/Uf';
import { RepositorioUf } from '../typeorm/repositorios/RepositorioUf';
import AppErros from '@compartilhado/erros/AppErros';

interface IRequest {
  codigo_uf: number;
}

class ServicoDetalhamentoUf {
  public async execute({ codigo_uf }: IRequest): Promise<Uf> {
    const repositorioUf = getCustomRepository(RepositorioUf);
    const uf = await repositorioUf.findOne(codigo_uf);

    if (!uf) {
      throw new AppErros(`UF com id = ${codigo_uf} não encontrada.`);
    }

    return uf;
  }
}

export default ServicoDetalhamentoUf;
