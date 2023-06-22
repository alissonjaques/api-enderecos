import existeUfComNomeJaCadastradoAtualizacao from './existeMunicipioComNomeJaCadastradoAtualizacao';
import validarCamposObrigatorios from '../geral/validarCamposObrigatorios';
import validarValorDoStatus from '../geral/validarValorDoStatus';
import Municipio from '@modules/municipios/typeorm/entidades/Municipio';

interface IRequest {
  codigo_municipio: number;
  codigo_uf: number;
  nome: string;
  status: number;
}

class ValidacoesAtualizar {
  async validar(
    { codigo_municipio, codigo_uf, nome, status }: IRequest,
    municipio: Municipio,
  ): Promise<void> {
    await existeUfComNomeJaCadastradoAtualizacao(
      codigo_municipio,
      nome,
      municipio.nome,
    );
    validarCamposObrigatorios(codigo_uf, nome, status, 'atualizar');
    validarValorDoStatus(status, 'atualizar');
  }
}

export default ValidacoesAtualizar;
