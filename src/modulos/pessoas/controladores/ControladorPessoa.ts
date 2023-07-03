import { Request, Response } from 'express';
import ServicoListarPessoas from '../servicos/ServicoListarPessoas';
import ServicoCriarPessoa from '../servicos/ServicoCriarPessoa';
import ServicoAtualizarPessoa from '../servicos/ServicoAtualizarPessoa';
import ServicoDeletarPessoa from '../servicos/ServicoDeletarPessoa';

export default class ControladorPessoa {
  public async consultaPersonalizadaPessoa(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const servicoListarPessoas = new ServicoListarPessoas();

    if (Object.keys(request.query).length !== 0) {
      const pessoas = await servicoListarPessoas.executaConsultaPersonalizada(
        request.query,
      );

      if (request.query.codigoPessoa) {
        if (Object.keys(pessoas).length == 0) {
          return response.json([]);
        }
        const { codigoPessoa } = request.query;
        const codigo_pessoa = Number(codigoPessoa);
        const pessoa = await servicoListarPessoas.consultarDetalhamentoPessoa(
          codigo_pessoa,
        );
        return response.json(
          pessoa
            ? {
                codigoPessoa: pessoa.codigoPessoa,
                nome: pessoa.nome,
                sobrenome: pessoa.sobrenome,
                idade: pessoa.idade,
                login: pessoa.login,
                senha: pessoa.senha,
                status: pessoa.status,
                enderecos: pessoa.enderecos.map(endereco => {
                  return {
                    codigoEndereco: endereco.codigoEndereco,
                    codigoPessoa: pessoa.codigoPessoa,
                    codigoBairro: endereco.bairro.codigoBairro,
                    nomeRua: endereco.nomeRua,
                    numero: endereco.numero,
                    complemento: endereco.complemento,
                    cep: endereco.cep,
                    bairro: {
                      codigoBairro: endereco.bairro.codigoBairro,
                      codigoMunicipio:
                        endereco.bairro.municipio.codigoMunicipio,
                      nome: endereco.bairro.nome,
                      status: endereco.bairro.status,
                      municipio: {
                        codigoMunicipio:
                          endereco.bairro.municipio.codigoMunicipio,
                        codigoUF: endereco.bairro.municipio.uf.codigoUF,
                        nome: endereco.bairro.municipio.nome,
                        status: endereco.bairro.municipio.status,
                        uf: {
                          codigoUF: endereco.bairro.municipio.uf.codigoUF,
                          sigla: endereco.bairro.municipio.uf.sigla,
                          nome: endereco.bairro.municipio.uf.nome,
                          status: endereco.bairro.municipio.uf.status,
                        },
                      },
                    },
                  };
                }),
              }
            : [],
        );
      }

      const pessoasEnderecos = pessoas.map(pessoa => {
        return { ...pessoa, enderecos: [] };
      });
      return response.json(pessoasEnderecos);
    }
    const pessoas = await servicoListarPessoas.executa();
    const pessoasEnderecos = pessoas.map(pessoa => {
      return { ...pessoa, enderecos: [] };
    });
    return response.json(pessoasEnderecos);
  }

  public async listar(request: Request, response: Response): Promise<Response> {
    const servicoListarPessoas = new ServicoListarPessoas();
    const pessoas = await servicoListarPessoas.executa();
    const pessoasEnderecos = pessoas.map(pessoa => {
      return { ...pessoa, enderecos: [] };
    });

    return response.json(pessoasEnderecos);
  }

  public async inserir(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { nome, sobrenome, idade, login, senha, status, enderecos } =
      request.body;
    const servicoCriarPessoa = new ServicoCriarPessoa();
    const pessoas = await servicoCriarPessoa.executa({
      nome,
      sobrenome,
      idade,
      login,
      senha,
      status,
      enderecos,
    });

    const pessoasComEnderecosVazios = pessoas.map(pessoa => {
      return {
        codigoPessoa: pessoa.codigoPessoa,
        nome: pessoa.nome,
        sobrenome: pessoa.sobrenome,
        idade: pessoa.idade,
        login: pessoa.login,
        senha: pessoa.senha,
        status: pessoa.status,
        enderecos: [],
      };
    });

    return response.json(pessoasComEnderecosVazios);
  }

  public async atualizar(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const {
      codigoPessoa,
      nome,
      sobrenome,
      idade,
      login,
      senha,
      status,
      enderecos,
    } = request.body;
    const codigo_pessoa = Number(codigoPessoa);
    const servicoAtualizarPessoa = new ServicoAtualizarPessoa();
    const pessoas = await servicoAtualizarPessoa.executa({
      codigoPessoa: codigo_pessoa,
      nome,
      sobrenome,
      idade,
      login,
      senha,
      status,
      enderecos,
    });

    const pessoasComEnderecosVazios = pessoas.map(pessoa => {
      return {
        codigoPessoa: pessoa.codigoPessoa,
        nome: pessoa.nome,
        sobrenome: pessoa.sobrenome,
        idade: pessoa.idade,
        login: pessoa.login,
        senha: pessoa.senha,
        status: pessoa.status,
        enderecos: [],
      };
    });

    return response.json(pessoasComEnderecosVazios);
  }

  public async deletar(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { codigoPessoa } = request.params;
    const codigo_pessoa = Number(codigoPessoa);
    const servicoDeletarPessoa = new ServicoDeletarPessoa();
    await servicoDeletarPessoa.execute({ codigoPessoa: codigo_pessoa });

    return response.json([]);
  }
}
