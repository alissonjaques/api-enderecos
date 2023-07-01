import AppErros from '@compartilhado/erros/AppErros';

function validarCamposComApenasEspacos(
  nome: string,
  descricaoMetodo: string,
): void {
  if (nome.trim().length == 0) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} UF no banco de dados.<br>Motivo: o campo nome não deve possuir apenas espaços em branco.`,
    );
  }
}

export default validarCamposComApenasEspacos;
