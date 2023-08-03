import { Request, Response } from 'express';
import ServicoListarEnderecos from '../servicos/ServicoListarEnderecos';
import Endereco from '../typeorm/entidades/Endereco';

export default class ControladorEndereco {
  public async listar(request: Request, response: Response): Promise<Response> {
    const servicoListarBairros = new ServicoListarEnderecos();
    let listaEnderecos: Endereco[] = [];
    if (request.query.codigoPessoa) {
      listaEnderecos = await servicoListarBairros.executa(
        Number(request.query.codigoPessoa),
      );
    }

    return response.json(listaEnderecos);
  }
}
