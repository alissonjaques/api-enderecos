import existeBairroComNomeJaCadastradoAtualizacao from './existeBairroComNomeJaCadastradoAtualizacao';
import validarCamposObrigatorios from '../geral/validarCamposObrigatorios';
import Bairro from '@modules/bairros/typeorm/entidades/Bairro';
import existeMunicipioBairro from '../geral/existeMunicipioBairro';
import validarValorDoStatus from '@compartilhado/validacoes/validarValorDoStatus';
import validarCamposComApenasEspacos from '../geral/validarCamposComApenasEspacos';
import validarCapacidadeMinimaCaracteres from '../geral/validarCapacidadeMinimaCaracteres';

interface IRequest {
  codigoBairro: number;
  codigoMunicipio: number;
  nome: string;
  status: number;
}

class ValidacoesAtualizar {
  async validar(
    { codigoBairro, codigoMunicipio, nome, status }: IRequest,
    bairro: Bairro,
  ): Promise<void> {
    await existeBairroComNomeJaCadastradoAtualizacao(
      codigoBairro,
      codigoMunicipio,
      nome,
      bairro.nome,
    );
    validarCamposObrigatorios(codigoMunicipio, nome, status, 'atualizar');
    validarValorDoStatus(status, 'atualizar o bairro');
    await existeMunicipioBairro(codigoMunicipio, 'atualizar');
    validarCamposComApenasEspacos(nome, 'atualizar');
    validarCapacidadeMinimaCaracteres(nome, 'atualizar');
  }
}

export default ValidacoesAtualizar;
