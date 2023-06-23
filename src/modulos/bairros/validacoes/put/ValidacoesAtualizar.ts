import existeBairroComNomeJaCadastradoAtualizacao from './existeBairroComNomeJaCadastradoAtualizacao';
import validarCamposObrigatorios from '../geral/validarCamposObrigatorios';
import Bairro from '@modules/bairros/typeorm/entidades/Bairro';
import existeMunicipioBairro from '../geral/existeMunicipioBairro';
import validarValorDoStatus from '@compartilhado/validacoes/validarValorDoStatus';

interface IRequest {
  codigo_bairro: number;
  codigo_municipio: number;
  nome: string;
  status: number;
}

class ValidacoesAtualizar {
  async validar(
    { codigo_bairro, codigo_municipio, nome, status }: IRequest,
    bairro: Bairro,
  ): Promise<void> {
    await existeBairroComNomeJaCadastradoAtualizacao(
      codigo_bairro,
      nome,
      bairro.nome,
    );
    validarCamposObrigatorios(codigo_municipio, nome, status, 'atualizar');
    validarValorDoStatus(status, 'atualizar o bairro');
    await existeMunicipioBairro(codigo_municipio, 'incluir');
  }
}

export default ValidacoesAtualizar;
