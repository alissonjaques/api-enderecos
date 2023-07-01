import AppErros from '@compartilhado/erros/AppErros';

function validarCep(cep: string, descricaoMetodo: string): void {
  const apenasNumeros = cep.replace(/\D/g, '');

  if (apenasNumeros.length !== 8) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} o endereço.<br>Motivo: CEP = ${cep} não é válido.`,
      404,
    );
  }

  const expressaoRegularCepValido = /^[0-9]{8}$/;

  if (!expressaoRegularCepValido.test(apenasNumeros)) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} o endereço.<br>Motivo: CEP = ${cep} não é válido.`,
      404,
    );
  }
}

export default validarCep;
