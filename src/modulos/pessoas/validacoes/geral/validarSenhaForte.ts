import AppErros from '@compartilhado/erros/AppErros';

function validarSenhaForte(senha: string, descricaoMetodo: string): void {
  if (senha.length < 8) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} a pessoa no banco de dados.<br>Motivo: a senha informada para a pessoa é fraca.<br> A senha precisa possuir:<br>Ao menos 8 dígitos;<br>Ao menos um caracter especial;<br>Letras maiúsculas e minúsculas;<br>Números.`,
    );
  }

  const contemLetrasMaiusculas = /[A-Z]/;
  const contemLetrasMinusculas = /[a-z]/;
  const contemNumeros = /[0-9]/;

  if (
    !contemLetrasMaiusculas.test(senha) ||
    !contemLetrasMinusculas.test(senha) ||
    !contemNumeros.test(senha)
  ) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} a pessoa no banco de dados.<br>Motivo: a senha informada para a pessoa é fraca.<br> A senha precisa possuir:<br>Ao menos 8 dígitos;<br>Ao menos um caracter especial;<br>Letras maiúsculas e minúsculas;<br>Números.`,
    );
  }

  const contemCaracteresEspeciais = /[!@#$%^&*(),.?":{}|<>]/;

  if (!contemCaracteresEspeciais.test(senha)) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} a pessoa no banco de dados.<br>Motivo: a senha informada para a pessoa é fraca.<br> A senha precisa possuir:<br>Ao menos 8 dígitos;<br>Ao menos um caracter especial;<br>Letras maiúsculas e minúsculas;<br>Números.`,
    );
  }
}

export default validarSenhaForte;
