import { Request, Response } from 'express';
import ServicoListarBairros from '../servicos/ServicoListarBairros';
import ServicoCriarBairro from '../servicos/ServicoCriarBairro';
import ServicoAtualizarBairro from '../servicos/ServicoAtualizarBairro';
import ServicoDeletarBairro from '../servicos/ServicoDeletarBairro';

export default class ControladorBairro {
  public async consultaPersonalizadaBairro(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const servicoListarBairros = new ServicoListarBairros();

    if (Object.keys(request.query).length !== 0) {
      const listaBairros =
        await servicoListarBairros.executaConsultaPersonalizada(request.query);

      if (
        !request.query.codigoBairro &&
        !request.query.codigoMunicipio &&
        !request.query.nome &&
        request.query.status
      ) {
        return response.json(listaBairros);
      }
      return response.json(listaBairros[0] ?? []);
    }

    const listaBairros = await servicoListarBairros.executa();
    return response.json(listaBairros);
  }

  public async listar(request: Request, response: Response): Promise<Response> {
    const servicoListarBairros = new ServicoListarBairros();
    const listaBairros = await servicoListarBairros.executa();

    return response.json(listaBairros);
  }

  public async inserir(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { codigoMunicipio, nome, status } = request.body;
    const codigo_municipio = Number(codigoMunicipio);
    const servicoCriarBairro = new ServicoCriarBairro();
    const bairro = await servicoCriarBairro.executa({
      codigo_municipio: codigo_municipio,
      nome,
      status,
    });

    return response.json(bairro);
  }

  public async atualizar(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { codigoBairro, codigoMunicipio, nome, status } = request.body;
    const codigo_bairro = Number(codigoBairro);
    const codigo_municipio = Number(codigoMunicipio);

    const servicoAtualizarBairro = new ServicoAtualizarBairro();
    const bairro = await servicoAtualizarBairro.executa({
      codigo_bairro,
      codigo_municipio,
      nome,
      status,
    });

    return response.json(bairro);
  }

  public async deletar(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { codigoBairro } = request.params;
    const codigo_bairro = Number(codigoBairro);
    const servicoDeletarBairro = new ServicoDeletarBairro();
    await servicoDeletarBairro.execute({ codigo_bairro });

    return response.json([]);
  }
}
