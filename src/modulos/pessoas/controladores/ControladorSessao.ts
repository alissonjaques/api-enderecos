import { Request, Response } from 'express';
import ServicoCriarSessaoUsuario from '../servicos/ServicoCriarSessaoUsuario';

export default class ControladorSessao {
  public async criar(request: Request, response: Response): Promise<Response> {
    const { login, senha } = request.body;

    const servicoCriarSessaoUsuario = new ServicoCriarSessaoUsuario();

    const pessoa = await servicoCriarSessaoUsuario.executa({
      login,
      senha,
    });

    return response.json(pessoa);
  }
}
