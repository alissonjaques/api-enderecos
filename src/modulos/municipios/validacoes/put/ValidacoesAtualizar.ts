import existeMunicipioComNomeJaCadastradoAtualizacao from './existeMunicipioComNomeJaCadastradoAtualizacao';
import validarCamposObrigatorios from '../geral/validarCamposObrigatorios';
import Municipio from '@modules/municipios/typeorm/entidades/Municipio';
import existeUfMunicipio from '../geral/existeUfMunicipio';
import validarValorDoStatus from '@compartilhado/validacoes/validarValorDoStatus';
import validarCamposComApenasEspacos from '../geral/validarCamposComApenasEspacos';
import validarCapacidadeMinimaCaracteres from '../geral/validarCapacidadeMinimaCaracteres';

interface IRequest {
  codigoMunicipio: number;
  codigoUF: number;
  nome: string;
  status: number;
}

class ValidacoesAtualizar {
  async validar(
    { codigoMunicipio, codigoUF, nome, status }: IRequest,
    municipio: Municipio,
  ): Promise<void> {
    await existeMunicipioComNomeJaCadastradoAtualizacao(
      codigoMunicipio,
      codigoUF,
      nome,
      municipio.nome,
    );
    validarCamposObrigatorios(codigoUF, nome, status, 'atualizar');
    validarValorDoStatus(status, 'atualizar o município');
    await existeUfMunicipio(codigoUF, 'atualizar');
    validarCamposComApenasEspacos(nome, 'atualizar');
    validarCapacidadeMinimaCaracteres(nome, 'atualizar');
  }
}

export default ValidacoesAtualizar;
