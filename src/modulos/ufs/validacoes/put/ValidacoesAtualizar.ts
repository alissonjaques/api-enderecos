import validarCamposObrigatorios from '../geral/validarCamposObrigatorios';
import existeUfComNomeJaCadastradoAtualizacao from '../put/existeUfComNomeJaCadastradoAtualizacao';
import Uf from '@modules/ufs/typeorm/entidades/Uf';
import existeUfComSiglaJaCadastradaAtualizacao from './existeUfComSiglaJaCadastradaAtualizacao';

interface IRequest {
  codigo_uf: number;
  sigla: string;
  nome: string;
  status: number;
}

class ValidacoesAtualizar {
  async validar(
    { codigo_uf, sigla, nome, status }: IRequest,
    uf: Uf,
  ): Promise<void> {
    await existeUfComSiglaJaCadastradaAtualizacao(codigo_uf, sigla, uf.sigla);
    await existeUfComNomeJaCadastradoAtualizacao(codigo_uf, nome, uf.nome);
    validarCamposObrigatorios(sigla, nome, status, 'atualizar');
  }
}

export default ValidacoesAtualizar;
