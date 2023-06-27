import { Request, Response } from 'express';
import ServicoListarUfs from '../servicos/ServicoListarUfs';
import ServicoCriarUf from '../servicos/ServicoCriarUf';
import ServicoAtualizarUf from '../servicos/ServicoAtualizarUf';
import ServicoDeletarUf from '../servicos/ServicoDeletarUf';

export default class ControladorUf {
  public async consultaPersonalizadaUf(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const servicoListarUfs = new ServicoListarUfs();

    if (Object.keys(request.query).length !== 0) {
      const ufs = await servicoListarUfs.executaConsultaPersonalizada(
        request.query,
      );

      if (
        !request.query.codigoUF &&
        !request.query.sigla &&
        !request.query.nome &&
        request.query.status
      ) {
        return response.json(ufs);
      }
      return response.json(ufs[0] ?? []);
    }
    const ufs = await servicoListarUfs.executa();
    return response.json(ufs);
  }

  public async listar(request: Request, response: Response): Promise<Response> {
    const servicoListarUfs = new ServicoListarUfs();
    const ufs = await servicoListarUfs.executa();

    return response.json(ufs);
  }

  public async inserir(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { sigla, nome, status } = request.body;
    const servicoCriarUf = new ServicoCriarUf();
    const uf = await servicoCriarUf.executa({
      sigla,
      nome,
      status,
    });

    return response.json(uf);
  }

  public async atualizar(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { codigoUF, sigla, nome, status } = request.body;
    const codigo_uf = Number(codigoUF);
    const servicoAtualizarUf = new ServicoAtualizarUf();
    const uf = await servicoAtualizarUf.executa({
      codigoUF: codigo_uf,
      sigla,
      nome,
      status,
    });
    return response.json(uf);
  }

  public async deletar(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { codigoUF } = request.params;
    const codigo_uf = Number(codigoUF);
    const servicoDeletarUf = new ServicoDeletarUf();
    await servicoDeletarUf.execute({ codigoUF: codigo_uf });

    return response.json([]);
  }
}
