import AppErros from '@compartilhado/erros/AppErros';

function validarCamposObrigatorios(
  sigla: string,
  nome: string,
  status: number,
  descricaoMetodo: string,
): void {
  if (!sigla) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} UF no banco de dados.<br>Motivo: o campo sigla é obrigatório`,
    );
  } else if (!nome) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} UF no banco de dados.<br>Motivo: o campo nome é obrigatório`,
    );
  } else if (!status) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} UF no banco de dados.<br>Motivo: o campo status é obrigatório`,
    );
  }
}

export default validarCamposObrigatorios;
