import { getCustomRepository } from 'typeorm';
import { RepositorioMunicipio } from '../typeorm/repositorios/RepositorioMunicipio';
import existeMunicipio from '../validacoes/delete/existeMunicipio';

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

    municipio.status = 2;
    await repositorioMunicipio.save(municipio);
  }
}

export default ServicoDeletarMunicipio;
