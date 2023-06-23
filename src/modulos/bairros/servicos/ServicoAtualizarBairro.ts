import { RepositorioBairro } from '../typeorm/repositorios/RepositorioBairro';
import Bairro from '../typeorm/entidades/Bairro';
import ServicoListarBairros from './ServicoListarBairros';
import { getCustomRepository } from 'typeorm';
import ValidacoesAtualizar from '../validacoes/put/ValidacoesAtualizar';
import existeBairro from '../validacoes/delete/existeBairro';
import AppErros from '@compartilhado/erros/AppErros';
import Municipio from '@modules/municipios/typeorm/entidades/Municipio';

interface IRequest {
  codigo_bairro: number;
  codigo_municipio: number;
  nome: string;
  status: number;
}

class ServicoAtualizarBairro {
  public async executa({
    codigo_bairro,
    codigo_municipio,
    nome,
    status,
  }: IRequest): Promise<Bairro[]> {
    const repositorioBairro = getCustomRepository(RepositorioBairro);

    if (!codigo_bairro) {
      throw new AppErros(
        `Não foi possível atualizar o bairro no banco de dados.<br>Motivo: o campo codigoBairro é obrigatório`,
      );
    }

    const bairro = await existeBairro(
      codigo_bairro,
      repositorioBairro,
      'atualizar',
    );

    const validacoes = new ValidacoesAtualizar();
    await validacoes.validar(
      { codigo_bairro, codigo_municipio, nome, status },
      bairro,
    );

    const municipio = new Municipio();
    municipio.codigo_municipio = codigo_municipio;

    bairro.codigo_municipio = municipio;
    bairro.nome = nome;
    bairro.status = status;

    await repositorioBairro.save(bairro);

    const servicoListarBairros = new ServicoListarBairros();
    return await servicoListarBairros.executa();
  }
}

export default ServicoAtualizarBairro;
