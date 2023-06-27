import { getCustomRepository } from 'typeorm';
import Municipio from '../typeorm/entidades/Municipio';
import ServicoListarMunicipios from './ServicoListarMunicipios';
import ValidacoesCadastrar from '../validacoes/post/ValidacoesCadastrar';
import { RepositorioMunicipio } from '../typeorm/repositorios/RepositorioMunicipio';
import gerarSequence from '@compartilhado/util/gerarSequence';

interface IRequest {
  codigoUF: number;
  nome: string;
  status: number;
}

class ServicoCriarMunicipio {
  public async executa({
    codigoUF,
    nome,
    status,
  }: IRequest): Promise<Municipio[]> {
    const repositorioMunicipio = getCustomRepository(RepositorioMunicipio);

    const validacoes = new ValidacoesCadastrar();
    await validacoes.validar({ codigoUF, nome, status });

    const codigoMunicipio = await gerarSequence('sequence_municipio');
    const municipio = repositorioMunicipio.create({
      codigoMunicipio,
      uf: { codigoUF: codigoUF },
      nome,
      status,
    });

    await repositorioMunicipio.save(municipio);

    const servicoListarMunicipios = new ServicoListarMunicipios();
    return await servicoListarMunicipios.executa();
  }
}

export default ServicoCriarMunicipio;
