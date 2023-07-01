import AppErros from '@compartilhado/erros/AppErros';

function validarCapacidadeMinimaCaracteres(
  nomeRua: string,
  complemento: string,
  descricaoMetodo: string,
): void {
  if (nomeRua.length < 3) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} endereco no banco de dados.<br>Motivo: o campo nomeRua deve possuir ao menos três caracteres.`,
    );
  } else if (complemento.length < 3) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} endereco no banco de dados.<br>Motivo: o campo complemento deve possuir ao menos três caracteres.`,
    );
  }
}

export default validarCapacidadeMinimaCaracteres;
