import { getCustomRepository } from 'typeorm';
import { RepositorioBairro } from '../typeorm/repositorios/RepositorioBairro';
import existeBairro from '../validacoes/delete/existeBairro';
import validarBairroEstaEmUso from '../validacoes/geral/validarBairroEstaEmUso';

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
    await validarBairroEstaEmUso(codigoBairro, 2, 'excluir');
    await repositorioBairro.delete(bairro);
  }
}

export default ServicoDeletarBairro;
