import { getCustomRepository, getManager } from 'typeorm';
import Bairro from '../typeorm/entidades/Bairro';
import ServicoListarBairros from './ServicoListarBairros';
import ValidacoesCadastrar from '../validacoes/post/ValidacoesCadastrar';
import { RepositorioBairro } from '../typeorm/repositorios/RepositorioBairro';
import gerarSequence from '@compartilhado/util/gerarSequence';

interface IRequest {
  codigo_municipio: number;
  nome: string;
  status: number;
}

class ServicoCriarBairro {
  public async executa({
    codigo_municipio,
    nome,
    status,
  }: IRequest): Promise<Bairro[]> {
    const repositorioBairro = getCustomRepository(RepositorioBairro);

    const validacoes = new ValidacoesCadastrar();
    await validacoes.validar({ codigo_municipio, nome, status });

    const codigo_bairro = await gerarSequence('sequence_bairro');
    const bairro = repositorioBairro.create({
      codigo_bairro,
      codigo_municipio: { codigo_municipio: codigo_municipio },
      nome,
      status,
    });

    await repositorioBairro.save(bairro);

    const servicoListarBairros = new ServicoListarBairros();
    return await servicoListarBairros.executa();
  }
}

export default ServicoCriarBairro;
