import { getCustomRepository } from 'typeorm';
import Endereco from '../typeorm/entidades/Endereco';
import ValidacoesCadastrar from '../validacoes/post/ValidacoesCadastrar';
import { RepositorioEndereco } from '../typeorm/repositorios/RepositorioEndereco';
import gerarSequence from '@compartilhado/util/gerarSequence';

interface IRequest {
  enderecos: Endereco[];
  codigoPessoa: number;
}

class ServicoCriarEnderecos {
  public async executa({ enderecos, codigoPessoa }: IRequest): Promise<void> {
    const repositorioEndereco = getCustomRepository(RepositorioEndereco);

    const validacoes = new ValidacoesCadastrar();
    for (let i = 0; i < enderecos.length; i++) {
      const endereco = enderecos[i];
      await validacoes.validar({
        codigoPessoa: codigoPessoa,
        codigoBairro: endereco.bairro.codigoBairro,
        nomeRua: endereco.nomeRua,
        numero: endereco.numero,
        complemento: endereco.complemento,
        cep: endereco.cep,
      });
      endereco.codigoEndereco = await gerarSequence('sequence_endereco');
    }

    const enderecosPreparados = repositorioEndereco.create(enderecos);

    await repositorioEndereco.save(enderecosPreparados);
  }
}

export default ServicoCriarEnderecos;
