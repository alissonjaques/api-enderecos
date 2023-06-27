import AppErros from '@compartilhado/erros/AppErros';

function validarCamposObrigatorios(
  codigoUF: number,
  nome: string,
  status: number,
  descricaoMetodo: string,
): void {
  if (!codigoUF) {
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
