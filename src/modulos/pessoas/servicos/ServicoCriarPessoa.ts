import { getCustomRepository } from 'typeorm';
import { RepositorioPessoa } from '../typeorm/repositorios/RepositorioPessoa';
import Pessoa from '../typeorm/entidades/Pessoa';
import ServicoListarPessoas from './ServicoListarPessoas';
import ValidacoesCadastrar from '../validacoes/post/ValidacoesCadastrar';
import gerarSequence from '@compartilhado/util/gerarSequence';
import Endereco from '@modules/enderecos/typeorm/entidades/Endereco';

interface IRequest {
  nome: string;
  sobrenome: string;
  idade: number;
  login: string;
  senha: string;
  status: number;
  enderecos: Endereco[];
}

class ServicoCriarPessoa {
  public async executa({
    nome,
    sobrenome,
    idade,
    login,
    senha,
    status,
    enderecos,
  }: IRequest): Promise<Pessoa[]> {
    const repositorioPessoa = getCustomRepository(RepositorioPessoa);

    const validacoes = new ValidacoesCadastrar();
    await validacoes.validar({
      nome,
      sobrenome,
      idade,
      login,
      senha,
      status,
      enderecos,
    });

    const codigo_pessoa = await gerarSequence('sequence_pessoa');
    const pessoa = repositorioPessoa.create({
      codigo_pessoa,
      nome,
      sobrenome,
      idade,
      login,
      senha,
      status,
    });
    await repositorioPessoa.save(pessoa);

    const servicoListarPessoas = new ServicoListarPessoas();
    return await servicoListarPessoas.executa();
  }
}

export default ServicoCriarPessoa;
