import { getCustomRepository } from 'typeorm';
import Endereco from '../typeorm/entidades/Endereco';
import ServicoListarEnderecos from './ServicoListarEnderecos';
import ValidacoesCadastrar from '../validacoes/post/ValidacoesCadastrar';
import { RepositorioEndereco } from '../typeorm/repositorios/RepositorioEndereco';
import gerarSequence from '@compartilhado/util/gerarSequence';

interface IRequest {
  codigo_pessoa: number;
  codigo_bairro: number;
  nome_rua: string;
  numero: string;
  complemento: string;
  cep: string;
}

class ServicoCriarEndereco {
  public async executa({
    codigo_pessoa,
    codigo_bairro,
    nome_rua,
    numero,
    complemento,
    cep,
  }: IRequest): Promise<Endereco[]> {
    const repositorioEndereco = getCustomRepository(RepositorioEndereco);

    const validacoes = new ValidacoesCadastrar();
    await validacoes.validar({
      codigo_pessoa,
      codigo_bairro,
      nome_rua,
      numero,
      complemento,
      cep,
    });

    const codigo_endereco = await gerarSequence('sequence_endereco');
    const endereco = repositorioEndereco.create({
      codigo_endereco,
      codigo_pessoa: { codigo_pessoa: codigo_pessoa },
      codigo_bairro: { codigo_bairro: codigo_bairro },
      nome_rua,
      numero,
      complemento,
      cep,
    });

    await repositorioEndereco.save(endereco);

    const servicoListarEnderecos = new ServicoListarEnderecos();
    return await servicoListarEnderecos.executa();
  }
}

export default ServicoCriarEndereco;
