import { getCustomRepository } from 'typeorm';
import Endereco from '../typeorm/entidades/Endereco';
import ServicoListarEnderecos from './ServicoListarEnderecos';
import ValidacoesCadastrar from '../validacoes/post/ValidacoesCadastrar';
import { RepositorioEndereco } from '../typeorm/repositorios/RepositorioEndereco';
import gerarSequence from '@compartilhado/util/gerarSequence';

interface IRequest {
  codigoPessoa: number;
  codigoBairro: number;
  nomeRua: string;
  numero: string;
  complemento: string;
  cep: string;
}

class ServicoCriarEndereco {
  public async executa({
    codigoPessoa,
    codigoBairro,
    nomeRua,
    numero,
    complemento,
    cep,
  }: IRequest): Promise<Endereco[]> {
    const repositorioEndereco = getCustomRepository(RepositorioEndereco);

    const validacoes = new ValidacoesCadastrar();
    await validacoes.validar({
      codigoPessoa,
      codigoBairro,
      nomeRua,
      numero,
      complemento,
      cep,
    });

    const codigoEndereco = await gerarSequence('sequence_endereco');
    const endereco = repositorioEndereco.create({
      codigoEndereco,
      pessoa: { codigoPessoa: codigoPessoa },
      bairro: { codigoBairro: codigoBairro },
      nomeRua,
      numero,
      complemento,
      cep,
    });

    await repositorioEndereco.save(endereco);

    const servicoListarEnderecos = new ServicoListarEnderecos();
    return await servicoListarEnderecos.executa(codigoPessoa);
  }
}

export default ServicoCriarEndereco;
