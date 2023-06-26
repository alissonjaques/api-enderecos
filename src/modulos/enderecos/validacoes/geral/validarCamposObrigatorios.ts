import AppErros from '@compartilhado/erros/AppErros';

function validarCamposObrigatorios(
  codigo_pessoa: number,
  codigo_bairro: number,
  nome_rua: string,
  numero: string,
  complemento: string,
  cep: string,
  descricaoMetodo: string,
): void {
  if (!codigo_pessoa) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} o endereço no banco de dados.<br>Motivo: o campo codigoPessoa é obrigatório`,
    );
  } else if (!codigo_bairro) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} o endereço no banco de dados.<br>Motivo: o campo codigoBairro é obrigatório`,
    );
  } else if (!nome_rua) {
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
