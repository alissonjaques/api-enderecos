import { getCustomRepository } from 'typeorm';
import { RepositorioPessoa } from '../typeorm/repositorios/RepositorioPessoa';
import Pessoa from '../typeorm/entidades/Pessoa';
import ServicoListarPessoas from './ServicoListarPessoas';
import ValidacoesCadastrar from '../validacoes/post/ValidacoesCadastrar';
import gerarSequence from '@compartilhado/util/gerarSequence';
import Endereco from '@modules/enderecos/typeorm/entidades/Endereco';
import ServicoCriarEnderecos from '@modules/enderecos/servicos/ServicoCriarEnderecos';

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

    const servicoCriarEnderecos = new ServicoCriarEnderecos();
    await servicoCriarEnderecos.validarEnderecos({ enderecos }, false);

    const codigoPessoa = await gerarSequence('sequence_pessoa');
    const pessoa = repositorioPessoa.create({
      codigoPessoa,
      nome,
      sobrenome,
      idade,
      login,
      senha,
      status,
    });

    await repositorioPessoa.save(pessoa);
    await servicoCriarEnderecos.executa({ enderecos }, codigoPessoa);

    const servicoListarPessoas = new ServicoListarPessoas();
    return await servicoListarPessoas.executa();
  }
}

export default ServicoCriarPessoa;
