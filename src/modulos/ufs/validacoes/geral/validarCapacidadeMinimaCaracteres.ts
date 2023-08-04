import AppErros from '@compartilhado/erros/AppErros';

function validarCapacidadeMinimaCaracteres(
  sigla: string,
  nome: string,
  descricaoMetodo: string,
): void {
  if (sigla.length < 2) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} UF no banco de dados. Motivo: o campo sigla deve possuir ao menos dois caracteres.`,
    );
  } else if (nome.length < 3) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} UF no banco de dados. Motivo: o campo nome deve possuir ao menos três caracteres.`,
    );
  }
}

export default validarCapacidadeMinimaCaracteres;
