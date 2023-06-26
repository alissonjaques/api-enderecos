import AppErros from '@compartilhado/erros/AppErros';

function validarCamposObrigatorios(
  nome: string,
  sobrenome: string,
  idade: number,
  login: string,
  senha: string,
  status: number,
  descricaoMetodo: string,
): void {
  if (!nome) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} a pessoa no banco de dados.<br>Motivo: o campo nome é obrigatório`,
    );
  } else if (!sobrenome) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} a pessoa no banco de dados.<br>Motivo: o campo sobrenome é obrigatório`,
    );
  } else if (!idade) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} a pessoa no banco de dados.<br>Motivo: o campo idade é obrigatório`,
    );
  } else if (!login) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} a pessoa no banco de dados.<br>Motivo: o campo login é obrigatório`,
    );
  } else if (!senha) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} a pessoa no banco de dados.<br>Motivo: o campo senha é obrigatório`,
    );
  } else if (!status) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} a pessoa no banco de dados.<br>Motivo: o campo status é obrigatório`,
    );
  }
}

export default validarCamposObrigatorios;
