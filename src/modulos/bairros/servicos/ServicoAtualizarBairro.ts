import { RepositorioBairro } from '../typeorm/repositorios/RepositorioBairro';
import Bairro from '../typeorm/entidades/Bairro';
import ServicoListarBairros from './ServicoListarBairros';
import { getCustomRepository } from 'typeorm';
import ValidacoesAtualizar from '../validacoes/put/ValidacoesAtualizar';
import existeBairro from '../validacoes/delete/existeBairro';
import AppErros from '@compartilhado/erros/AppErros';
import Municipio from '@modules/municipios/typeorm/entidades/Municipio';

interface IRequest {
  codigoBairro: number;
  codigoMunicipio: number;
  nome: string;
  status: number;
}

class ServicoAtualizarBairro {
  public async executa({
    codigoBairro,
    codigoMunicipio,
    nome,
    status,
  }: IRequest): Promise<Bairro[]> {
    const repositorioBairro = getCustomRepository(RepositorioBairro);

    if (!codigoBairro) {
      throw new AppErros(
        `Não foi possível atualizar o bairro no banco de dados.<br>Motivo: o campo codigoBairro é obrigatório`,
      );
    }

    if (!codigoMunicipio) {
      throw new AppErros(
        `Não foi possível atualizar o bairro no banco de dados.<br>Motivo: o campo codigoMunicipio é obrigatório`,
      );
    }

    const bairro = await existeBairro(
      codigoBairro,
      repositorioBairro,
      'atualizar',
    );

    const validacoes = new ValidacoesAtualizar();
    await validacoes.validar(
      { codigoBairro, codigoMunicipio, nome, status },
      bairro,
    );

    const municipio = new Municipio();
    municipio.codigoMunicipio = codigoMunicipio;

    bairro.municipio = municipio;
    bairro.nome = nome;
    bairro.status = status;

    await repositorioBairro.save(bairro);

    const servicoListarBairros = new ServicoListarBairros();
    return await servicoListarBairros.executa();
  }
}

export default ServicoAtualizarBairro;
