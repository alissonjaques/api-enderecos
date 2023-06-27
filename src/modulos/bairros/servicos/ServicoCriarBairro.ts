import { getCustomRepository } from 'typeorm';
import Bairro from '../typeorm/entidades/Bairro';
import ServicoListarBairros from './ServicoListarBairros';
import ValidacoesCadastrar from '../validacoes/post/ValidacoesCadastrar';
import { RepositorioBairro } from '../typeorm/repositorios/RepositorioBairro';
import gerarSequence from '@compartilhado/util/gerarSequence';

interface IRequest {
  codigoMunicipio: number;
  nome: string;
  status: number;
}

class ServicoCriarBairro {
  public async executa({
    codigoMunicipio,
    nome,
    status,
  }: IRequest): Promise<Bairro[]> {
    const repositorioBairro = getCustomRepository(RepositorioBairro);

    const validacoes = new ValidacoesCadastrar();
    await validacoes.validar({ codigoMunicipio, nome, status });

    const codigoBairro = await gerarSequence('sequence_bairro');
    const bairro = repositorioBairro.create({
      codigoBairro,
      municipio: { codigoMunicipio: codigoMunicipio },
      nome,
      status,
    });

    await repositorioBairro.save(bairro);

    const servicoListarBairros = new ServicoListarBairros();
    return await servicoListarBairros.executa();
  }
}

export default ServicoCriarBairro;
