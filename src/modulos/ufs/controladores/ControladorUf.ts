import { Request, Response } from 'express';
import ServicoListarUfs from '../servicos/ServicoListarUfs';
import ServicoDetalhamentoUf from '../servicos/ServicoDetalhamentoUf';
import ServicoCriarUf from '../servicos/ServicoCriarUf';
import ServicoAtualizarUf from '../servicos/ServicoAtualizarUf';
import ServicoDeletarUf from '../servicos/ServicoDeletarUf';

export default class ControladorUf {
  public async index(request: Request, response: Response): Promise<Response> {
    const servicoListarUfs = new ServicoListarUfs();
    const ufs = await servicoListarUfs.executa();

    return response.json(ufs);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { codigoUF } = request.params;
    const codigo_uf = Number(codigoUF);
    const servicoDetalhamentoUf = new ServicoDetalhamentoUf();
    const uf = await servicoDetalhamentoUf.execute({ codigo_uf });

    return response.json(uf);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { sigla, nome, status } = request.body;
    const servicoCriarUf = new ServicoCriarUf();
    const uf = await servicoCriarUf.executa({
      sigla,
      nome,
      status,
    });

    return response.json(uf);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { codigoUF, sigla, nome, status } = request.body;
    const codigo_uf = Number(codigoUF);
    const servicoAtualizarUf = new ServicoAtualizarUf();
    const uf = await servicoAtualizarUf.executa({
      codigo_uf,
      sigla,
      nome,
      status,
    });
    return response.json(uf);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { codigoUF } = request.params;
    const codigo_uf = Number(codigoUF);
    const servicoDeletarUf = new ServicoDeletarUf();
    await servicoDeletarUf.execute({ codigo_uf });

    return response.json([]);
  }
}
