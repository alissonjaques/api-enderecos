import { getCustomRepository } from 'typeorm';
import { RepositorioMunicipio } from '../typeorm/repositorios/RepositorioMunicipio';
import existeMunicipio from '../validacoes/delete/existeMunicipio';
import validarMunicipioEstaEmUso from '../validacoes/geral/validarMunicipioEstaEmUso';

interface IRequest {
  codigoMunicipio: number;
}

class ServicoDeletarMunicipio {
  public async execute({ codigoMunicipio }: IRequest): Promise<void> {
    const repositorioMunicipio = getCustomRepository(RepositorioMunicipio);
    const municipio = await existeMunicipio(
      codigoMunicipio,
      repositorioMunicipio,
      'deletar',
    );
    await validarMunicipioEstaEmUso(codigoMunicipio, 2, 'excluir');
    await repositorioMunicipio.delete(municipio);
  }
}

export default ServicoDeletarMunicipio;
