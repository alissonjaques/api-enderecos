import { RepositorioEndereco } from '../typeorm/repositorios/RepositorioEndereco';
import { getCustomRepository } from 'typeorm';
import ValidacoesAtualizar from '../validacoes/put/ValidacoesAtualizar';

interface IRequest {
  enderecos: any[];
}

class ServicoAtualizarEnderecos {
  public async validarEnderecos(
    { enderecos }: IRequest,
    codigoPessoa: number,
  ): Promise<void> {
    const validacoes = new ValidacoesAtualizar();
    for (let i = 0; i < enderecos.length; i++) {
      const endereco = enderecos[i];
      await validacoes.validar({
        codigoEndereco: endereco.codigoEndereco,
        codigoPessoa: endereco.codigoPessoa,
        codigoBairro: endereco.codigoBairro,
        nomeRua: endereco.nomeRua,
        numero: endereco.numero,
        complemento: endereco.complemento,
        cep: endereco.cep,
        codigoPessoaEndereco: codigoPessoa,
      });
    }
  }

  public async executa({ enderecos }: IRequest): Promise<void> {
    const repositorioEndereco = getCustomRepository(RepositorioEndereco);
    const enderecosFormatados = enderecos.map(endereco => {
      return {
        codigoEndereco: endereco.codigoEndereco,
        pessoa: { codigoPessoa: endereco.codigoPessoa },
        bairro: { codigoBairro: endereco.codigoBairro },
        nomeRua: endereco.nomeRua,
        numero: endereco.numero,
        complemento: endereco.complemento,
        cep: endereco.cep,
      };
    });
    await repositorioEndereco.save(enderecosFormatados);
  }
}

export default ServicoAtualizarEnderecos;
