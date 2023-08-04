import AppErros from '@compartilhado/erros/AppErros';

function validarCamposObrigatorios(
  codigoMunicipio: number,
  nome: string,
  status: number,
  descricaoMetodo: string,
): void {
  if (!codigoMunicipio) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} bairro no banco de dados. Motivo: o campo codigoMunicipio é obrigatório`,
    );
  } else if (!nome) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} bairro no banco de dados. Motivo: o campo nome é obrigatório`,
    );
  } else if (!status) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} bairro no banco de dados. Motivo: o campo status é obrigatório`,
    );
  }
}

export default validarCamposObrigatorios;
