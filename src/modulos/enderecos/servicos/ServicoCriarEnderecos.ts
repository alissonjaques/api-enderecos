import { getCustomRepository } from 'typeorm';
import Endereco from '../typeorm/entidades/Endereco';
import ValidacoesCadastrar from '../validacoes/post/ValidacoesCadastrar';
import { RepositorioEndereco } from '../typeorm/repositorios/RepositorioEndereco';
import gerarSequence from '@compartilhado/util/gerarSequence';

interface IRequest {
  enderecos: Endereco[];
  codigo_pessoa: number;
}

class ServicoCriarEnderecos {
  public async executa({ enderecos, codigo_pessoa }: IRequest): Promise<void> {
    const repositorioEndereco = getCustomRepository(RepositorioEndereco);

    const validacoes = new ValidacoesCadastrar();
    for (let i = 0; i < enderecos.length; i++) {
      const endereco = enderecos[i];
      await validacoes.validar({
        codigo_pessoa: codigo_pessoa,
        codigo_bairro: endereco.codigo_bairro.codigo_bairro,
        nome_rua: endereco.nome_rua,
        numero: endereco.numero,
        complemento: endereco.complemento,
        cep: endereco.cep,
      });
      endereco.codigo_endereco = await gerarSequence('sequence_endereco');
    }

    const enderecosPreparados = repositorioEndereco.create(enderecos);

    await repositorioEndereco.save(enderecosPreparados);
  }
}

export default ServicoCriarEnderecos;
