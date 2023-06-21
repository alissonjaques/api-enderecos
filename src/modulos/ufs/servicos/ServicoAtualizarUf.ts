import AppErros from '@compartilhado/erros/AppErros';
import { getCustomRepository, getManager } from 'typeorm';
import { RepositorioUf } from '../typeorm/repositorios/RepositorioUf';
import Uf from '../typeorm/entidades/Uf';
import Entidade from '@compartilhado/enums/Entidade';

interface IRequest {
  codigo_uf: number;
  sigla: string;
  nome: string;
  status: number;
}

class ServicoAtualizarUf {
  public async execute({
    codigo_uf,
    sigla,
    nome,
    status,
  }: IRequest): Promise<Uf> {
    const repositorioUf = getCustomRepository(RepositorioUf);

    const uf = await repositorioUf.findOne(codigo_uf);

    if (!uf) {
      throw new AppErros(`Produto com id = ${codigo_uf} não encontrado.`);
    }

    const existeUfComNomeJaCadastrado = await repositorioUf.findByName(nome);

    if (existeUfComNomeJaCadastrado && nome !== uf.nome) {
      throw new AppErros(
        `Não foi atualizar a UF de id = ${codigo_uf}.
        <br>Já existe uma Unidade Federativa com o nome = ${nome} cadastrada no sistema.`,
      );
    }

    uf.nome = nome;
    uf.sigla = sigla;
    uf.status = status;

    await repositorioUf.save(uf);

    return uf;
  }
}

export default ServicoAtualizarUf;
