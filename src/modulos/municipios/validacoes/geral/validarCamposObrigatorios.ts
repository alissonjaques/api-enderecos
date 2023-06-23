import AppErros from '@compartilhado/erros/AppErros';

function validarCamposObrigatorios(
  codigo_uf: number,
  nome: string,
  status: number,
  descricaoMetodo: string,
): void {
  if (!codigo_uf) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} município no banco de dados.<br>Motivo: o campo codigoUF é obrigatório`,
    );
  } else if (!nome) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} município no banco de dados.<br>Motivo: o campo nome é obrigatório`,
    );
  } else if (!status) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} município no banco de dados.<br>Motivo: o campo status é obrigatório`,
    );
  }
}

export default validarCamposObrigatorios;
