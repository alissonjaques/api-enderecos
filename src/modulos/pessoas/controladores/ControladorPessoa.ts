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

      if (
        !request.query.codigoUF &&
        !request.query.sigla &&
        !request.query.nome &&
        request.query.status
      ) {
        return response.json(pessoas);
      }
      return response.json(pessoas[0] ?? []);
    }
    const pessoas = await servicoListarPessoas.executa();
    return response.json(pessoas);
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
    console.log(enderecos);
    const servicoCriarPessoa = new ServicoCriarPessoa();
    const pessoa = await servicoCriarPessoa.executa({
      nome,
      sobrenome,
      idade,
      login,
      senha,
      status,
      enderecos,
    });

    return response.json({ ...pessoa, enderecos: [] });
  }

  public async atualizar(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { codigoPessoa, nome, sobrenome, idade, login, senha, status } =
      request.body;
    const codigo_pessoa = Number(codigoPessoa);
    const servicoAtualizarPessoa = new ServicoAtualizarPessoa();
    const pessoa = await servicoAtualizarPessoa.executa({
      codigo_pessoa,
      nome,
      sobrenome,
      idade,
      login,
      senha,
      status,
    });
    return response.json(pessoa);
  }

  public async deletar(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { codigoPessoa } = request.params;
    const codigo_pessoa = Number(codigoPessoa);
    const servicoDeletarPessoa = new ServicoDeletarPessoa();
    await servicoDeletarPessoa.execute({ codigo_pessoa });

    return response.json([]);
  }
}
