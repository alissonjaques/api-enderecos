import existeUfComNomeJaCadastradoAtualizacao from '../put/existeUfComNomeJaCadastradoAtualizacao';
import Uf from '@modules/ufs/typeorm/entidades/Uf';
import existeUfComSiglaJaCadastradaAtualizacao from './existeUfComSiglaJaCadastradaAtualizacao';
import validarCamposObrigatorios from '../geral/validarCamposObrigatorios';
import validarValorDoStatus from '@compartilhado/validacoes/validarValorDoStatus';
import validarCamposComApenasEspacos from '../geral/validarCamposComApenasEspacos';

interface IRequest {
  codigoUF: number;
  sigla: string;
  nome: string;
  status: number;
}

class ValidacoesAtualizar {
  async validar(
    { codigoUF, sigla, nome, status }: IRequest,
    uf: Uf,
  ): Promise<void> {
    await existeUfComSiglaJaCadastradaAtualizacao(codigoUF, sigla, uf.sigla);
    await existeUfComNomeJaCadastradoAtualizacao(codigoUF, nome, uf.nome);
    validarCamposObrigatorios(sigla, nome, status, 'atualizar');
    validarValorDoStatus(status, 'atualizar a UF');
    validarCamposComApenasEspacos(sigla, nome, 'atualizar');
  }
}

export default ValidacoesAtualizar;
