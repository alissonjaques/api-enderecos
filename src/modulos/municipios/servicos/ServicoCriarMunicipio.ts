import { getCustomRepository, getManager } from 'typeorm';
import Municipio from '../typeorm/entidades/Municipio';
import ServicoListarMunicipios from './ServicoListarMunicipios';
import ValidacoesCadastrar from '../validacoes/post/ValidacoesCadastrar';
import { RepositorioMunicipio } from '../typeorm/repositorios/RepositorioMunicipio';
import gerarSequence from '@compartilhado/util/gerarSequence';

interface IRequest {
  codigo_uf: number;
  nome: string;
  status: number;
}

class ServicoCriarMunicipio {
  public async executa({
    codigo_uf,
    nome,
    status,
  }: IRequest): Promise<Municipio[]> {
    const repositorioMunicipio = getCustomRepository(RepositorioMunicipio);

    const validacoes = new ValidacoesCadastrar();
    await validacoes.validar({ codigo_uf, nome, status });

    const codigo_municipio = await gerarSequence('sequence_municipio');
    const municipio = repositorioMunicipio.create({
      codigo_municipio,
      codigo_uf: { codigo_uf: codigo_uf },
      nome,
      status,
    });

    await repositorioMunicipio.save(municipio);

    const servicoListarMunicipios = new ServicoListarMunicipios();
    return await servicoListarMunicipios.executa();
  }
}

export default ServicoCriarMunicipio;
