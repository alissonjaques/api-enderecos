import AppErros from '@compartilhado/erros/AppErros';

function validarCampoNumero(numero: string, descricaoMetodo: string): void {
  const expressaoRegularApenasNumeros = /^[0-9]+$/;

  const valorNumero = Number(numero);
  if ((valorNumero && valorNumero < 1) || valorNumero == 0) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} endereco no banco de dados. Motivo: o campo numero deve ser positivo, campo numero passado: ${numero}.`,
    );
  }

  if (!expressaoRegularApenasNumeros.test(numero)) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} endereco no banco de dados. Motivo: o campo numero deve conter apenas números, campo numero passado: ${numero}.`,
    );
  }
}

export default validarCampoNumero;
