import AppErros from '@compartilhado/erros/AppErros';

function validarCamposObrigatorios(
  codigoBairro: number,
  nomeRua: string,
  numero: string,
  complemento: string,
  cep: string,
  descricaoMetodo: string,
): void {
  if (!codigoBairro) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} o endereço no banco de dados.<br>Motivo: o campo codigoBairro é obrigatório`,
    );
  } else if (!nomeRua) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} o endereço no banco de dados.<br>Motivo: o campo nomeRua é obrigatório`,
    );
  } else if (!numero) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} o endereço no banco de dados.<br>Motivo: o campo numero é obrigatório`,
    );
  } else if (!complemento) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} o endereço no banco de dados.<br>Motivo: o campo complemento é obrigatório`,
    );
  } else if (!cep) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} o endereço no banco de dados.<br>Motivo: o campo cep é obrigatório`,
    );
  }
}

export default validarCamposObrigatorios;
