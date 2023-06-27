import Pessoa from '../typeorm/entidades/Pessoa';
import ServicoListarPessoas from './ServicoListarPessoas';
import { getCustomRepository } from 'typeorm';
import ValidacoesAtualizar from '../validacoes/put/ValidacoesAtualizar';
import existePessoa from '../validacoes/delete/existePessoa';
import AppErros from '@compartilhado/erros/AppErros';
import { RepositorioPessoa } from '../typeorm/repositorios/RepositorioPessoa';

interface IRequest {
  codigo_pessoa: number;
  nome: string;
  sobrenome: string;
  idade: number;
  login: string;
  senha: string;
  status: number;
}

class ServicoAtualizarPessoa {
  public async executa({
    codigo_pessoa,
    nome,
    sobrenome,
    idade,
    login,
    senha,
    status,
  }: IRequest): Promise<Pessoa[]> {
    const repositorioPessoa = getCustomRepository(RepositorioPessoa);

    if (!codigo_pessoa) {
      throw new AppErros(
        `Não foi possível atualizar a pessoa no banco de dados.<br>Motivo: o campo codigoPessoa é obrigatório`,
      );
    }

    const pessoa = await existePessoa(
      codigo_pessoa,
      repositorioPessoa,
      'atualizar',
    );

    const validacoes = new ValidacoesAtualizar();
    await validacoes.validar(
      { codigo_pessoa, nome, sobrenome, idade, login, senha, status },
      pessoa,
    );

    pessoa.nome = nome;
    pessoa.sobrenome = sobrenome;
    pessoa.idade = idade;
    pessoa.login = login;
    pessoa.senha = senha;
    pessoa.status = status;

    await repositorioPessoa.save(pessoa);

    const servicoListarPessoas = new ServicoListarPessoas();
    return await servicoListarPessoas.executa();
  }
}

export default ServicoAtualizarPessoa;