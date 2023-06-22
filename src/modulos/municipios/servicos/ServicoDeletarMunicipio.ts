import { getCustomRepository } from 'typeorm';
import { RepositorioMunicipio } from '../typeorm/repositorios/RepositorioMunicipio';
import existeMunicipio from '../validacoes/delete/existeMunicipio';

interface IRequest {
  codigo_municipio: number;
}

class ServicoDeletarMunicipio {
  public async execute({ codigo_municipio }: IRequest): Promise<void> {
    const repositorioMunicipio = getCustomRepository(RepositorioMunicipio);
    const municipio = await existeMunicipio(
      codigo_municipio,
      repositorioMunicipio,
      'deletar',
    );

    municipio.status = 2;
    await repositorioMunicipio.save(municipio);
  }
}

export default ServicoDeletarMunicipio;
