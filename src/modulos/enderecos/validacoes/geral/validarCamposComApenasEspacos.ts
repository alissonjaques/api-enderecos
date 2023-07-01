import AppErros from '@compartilhado/erros/AppErros';

function validarCamposComApenasEspacos(
  nomeRua: string,
  numero: string,
  complemento: string,
  cep: string,
  descricaoMetodo: string,
): void {
  if (nomeRua.trim().length == 0) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} endereco no banco de dados.<br>Motivo: o campo nomeRua não deve possuir apenas espaços em branco.`,
    );
  } else if (numero.trim().length == 0) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} endereco no banco de dados.<br>Motivo: o campo numero não deve possuir apenas espaços em branco.`,
    );
  } else if (complemento.trim().length == 0) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} endereco no banco de dados.<br>Motivo: o campo complemento não deve possuir apenas espaços em branco.`,
    );
  } else if (cep.trim().length == 0) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} endereco no banco de dados.<br>Motivo: o campo cep não deve possuir apenas espaços em branco.`,
    );
  }
}

export default validarCamposComApenasEspacos;
