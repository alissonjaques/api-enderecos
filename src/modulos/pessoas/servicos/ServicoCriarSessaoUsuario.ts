import { getCustomRepository } from 'typeorm';
import Pessoa from '../typeorm/entidades/Pessoa';
import { RepositorioPessoa } from '../typeorm/repositorios/RepositorioPessoa';
import gerarHash from '@compartilhado/util/gerarHash';
import AppErros from '@compartilhado/erros/AppErros';
import { sign } from 'jsonwebtoken';
import autorizacao from '@config/autorizacao';

interface IRequest {
  login: string;
  senha: string;
}

interface IResponse {
  pessoa: Pessoa;
  token: string;
}

class ServicoCriarSessaoUsuario {
  public async executa({ login, senha }: IRequest): Promise<IResponse> {
    const respositorioPessoa = getCustomRepository(RepositorioPessoa);
    const pessoa = await respositorioPessoa.encontrarPorLogin(login);

    if (!pessoa) {
      throw new AppErros(
        'Não foi possível logar. Motivo: login ou senha inválidos',
        401,
      );
    }

    let senhaOk = false;
    if (gerarHash(senha) == pessoa.senha) {
      senhaOk = true;
    }

    if (!senhaOk) {
      throw new AppErros(
        'Não foi possível logar. Motivo: login ou senha inválidos',
        401,
      );
    }

    const token = sign({}, autorizacao.jwt.segredo, {
      subject: String(pessoa.codigoPessoa),
      expiresIn: autorizacao.jwt.expiraEm,
    });

    return {
      pessoa,
      token,
    };
  }
}

export default ServicoCriarSessaoUsuario;
