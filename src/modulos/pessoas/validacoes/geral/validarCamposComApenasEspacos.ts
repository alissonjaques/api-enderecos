import AppErros from '@compartilhado/erros/AppErros';

function validarCamposComApenasEspacos(
  nome: string,
  sobrenome: string,
  login: string,
  senha: string,
  descricaoMetodo: string,
): void {
  if (nome.trim().length == 0) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} pessoa no banco de dados.<br>Motivo: o campo nome não deve possuir apenas espaços em branco.`,
    );
  } else if (sobrenome.trim().length == 0) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} pessoa no banco de dados.<br>Motivo: o campo sobrenome não deve possuir apenas espaços em branco.`,
    );
  } else if (login.trim().length == 0) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} pessoa no banco de dados.<br>Motivo: o campo login não deve possuir apenas espaços em branco.`,
    );
  } else if (senha.trim().length == 0) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} pessoa no banco de dados.<br>Motivo: o campo senha não deve possuir apenas espaços em branco.`,
    );
  }
}

export default validarCamposComApenasEspacos;
