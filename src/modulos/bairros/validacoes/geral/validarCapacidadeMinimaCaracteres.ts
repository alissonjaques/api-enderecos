import AppErros from '@compartilhado/erros/AppErros';

function validarCapacidadeMinimaCaracteres(
  nome: string,
  descricaoMetodo: string,
): void {
  if (nome.length < 3) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} bairro no banco de dados. Motivo: o campo nome deve possuir ao menos três caracteres.`,
    );
  }
}

export default validarCapacidadeMinimaCaracteres;
