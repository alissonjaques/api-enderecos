import { getCustomRepository } from 'typeorm';
import ValidacoesCadastrar from '../validacoes/post/ValidacoesCadastrar';
import { RepositorioEndereco } from '../typeorm/repositorios/RepositorioEndereco';
import gerarSequence from '@compartilhado/util/gerarSequence';
import AppErros from '@compartilhado/erros/AppErros';

interface IRequest {
  enderecos: any[];
}

class ServicoCriarEnderecos {
  public async validarEnderecos(
    { enderecos }: IRequest,
    deveFericarPessoa: boolean,
  ): Promise<void> {
    const validacoes = new ValidacoesCadastrar();
    for (let i = 0; i < enderecos.length; i++) {
      const endereco = enderecos[i];
      if (deveFericarPessoa && !endereco.codigoPessoa) {
        throw new AppErros(
          `Não foi possível inserir o endereço no banco de dados. Motivo: o campo codigoPessoa é obrigatório`,
        );
      }
      await validacoes.validar({
        codigoBairro: endereco.codigoBairro,
        nomeRua: endereco.nomeRua,
        numero: endereco.numero,
        complemento: endereco.complemento,
        cep: endereco.cep,
      });
    }
  }

  public async executa(
    { enderecos }: IRequest,
    codigoPessoa: number,
  ): Promise<void> {
    const repositorioEndereco = getCustomRepository(RepositorioEndereco);

    for (let i = 0; i < enderecos.length; i++) {
      const endereco = enderecos[i];
      endereco.codigoEndereco = await gerarSequence('sequence_endereco');
      endereco.pessoa = { codigoPessoa: codigoPessoa };
      endereco.bairro = { codigoBairro: endereco.codigoBairro };
    }

    const enderecosPreparados = repositorioEndereco.create(enderecos);

    await repositorioEndereco.save(enderecosPreparados);
  }
}

export default ServicoCriarEnderecos;
