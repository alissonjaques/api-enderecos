import AppErros from '@compartilhado/erros/AppErros';

function validarCamposComApenasEspacos(
  sigla: string,
  nome: string,
  descricaoMetodo: string,
): void {
  if (sigla.trim().length == 0) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} UF no banco de dados.<br>Motivo: o campo sigla não deve possuir apenas espaços em branco.`,
    );
  } else if (nome.trim().length == 0) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} UF no banco de dados.<br>Motivo: o campo nome não deve possuir apenas espaços em branco.`,
    );
  }
}

export default validarCamposComApenasEspacos;
