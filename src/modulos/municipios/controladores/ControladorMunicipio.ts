import { Request, Response } from 'express';
import ServicoListarMunicipios from '../servicos/ServicoListarMunicipios';
import ServicoCriarMunicipio from '../servicos/ServicoCriarMunicipio';
import ServicoAtualizarMunicipio from '../servicos/ServicoAtualizarMunicipio';
import ServicoDeletarMunicipio from '../servicos/ServicoDeletarMunicipio';

export default class ControladorMunicipio {
  public async consultaPersonalizadaMunicipio(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const servicoListarMunicipios = new ServicoListarMunicipios();

    if (Object.keys(request.query).length !== 0) {
      const listaMunicipios =
        await servicoListarMunicipios.executaConsultaPersonalizada(
          request.query,
        );

      if (request.query.codigoMunicipio) {
        return response.json(listaMunicipios[0] ?? []);
      }

      return response.json(listaMunicipios);
    }

    const listaMunicipios = await servicoListarMunicipios.executa();
    return response.json(listaMunicipios);
  }

  public async listar(request: Request, response: Response): Promise<Response> {
    const servicoListarMunicipios = new ServicoListarMunicipios();
    const listaMunicipios = await servicoListarMunicipios.executa();

    return response.json(listaMunicipios);
  }

  public async inserir(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { codigoUF, nome, status } = request.body;
    const codigo_uf = Number(codigoUF);
    const servicoCriarMunicipio = new ServicoCriarMunicipio();
    const municipio = await servicoCriarMunicipio.executa({
      codigo_uf: codigo_uf,
      nome,
      status,
    });

    return response.json(municipio);
  }

  public async atualizar(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { codigoMunicipio, codigoUF, nome, status } = request.body;
    const codigo_municipio = Number(codigoMunicipio);
    const codigo_uf = Number(codigoUF);

    const servicoAtualizarMunicipio = new ServicoAtualizarMunicipio();
    const municipio = await servicoAtualizarMunicipio.executa({
      codigo_municipio,
      codigo_uf,
      nome,
      status,
    });

    return response.json(municipio);
  }

  public async deletar(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { codigoMunicipio } = request.params;
    const codigo_municipio = Number(codigoMunicipio);
    const servicoDeletarMunicipio = new ServicoDeletarMunicipio();
    await servicoDeletarMunicipio.execute({ codigo_municipio });

    return response.json([]);
  }
}
