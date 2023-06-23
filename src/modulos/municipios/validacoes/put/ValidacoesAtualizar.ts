import existeMunicipioComNomeJaCadastradoAtualizacao from './existeMunicipioComNomeJaCadastradoAtualizacao';
import validarCamposObrigatorios from '../geral/validarCamposObrigatorios';
import validarValorDoStatus from '../geral/validarValorDoStatus';
import Municipio from '@modules/municipios/typeorm/entidades/Municipio';
import existeUfMunicipio from '../geral/existeUfMunicipio';

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
    await existeMunicipioComNomeJaCadastradoAtualizacao(
      codigo_municipio,
      nome,
      municipio.nome,
    );
    validarCamposObrigatorios(codigo_uf, nome, status, 'atualizar');
    validarValorDoStatus(status, 'atualizar');
    await existeUfMunicipio(codigo_uf, 'incluir');
  }
}

export default ValidacoesAtualizar;
