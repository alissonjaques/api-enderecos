import AppErros from '@compartilhado/erros/AppErros';

function validarSenhaForte(senha: string, descricaoMetodo: string): void {
  if (senha.length < 8) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} a pessoa no banco de dados. Motivo: a senha informada para a pessoa é fraca.  A senha precisa possuir: Ao menos 8 dígitos; Ao menos um caracter especial; Letras maiúsculas e minúsculas; Números.`,
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
      `Não foi possível ${descricaoMetodo} a pessoa no banco de dados. Motivo: a senha informada para a pessoa é fraca.  A senha precisa possuir: Ao menos 8 dígitos; Ao menos um caracter especial; Letras maiúsculas e minúsculas; Números.`,
    );
  }

  const contemCaracteresEspeciais = /[!@#$%^&*(),.?":{}|<>]/;

  if (!contemCaracteresEspeciais.test(senha)) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} a pessoa no banco de dados. Motivo: a senha informada para a pessoa é fraca.  A senha precisa possuir: Ao menos 8 dígitos; Ao menos um caracter especial; Letras maiúsculas e minúsculas; Números.`,
    );
  }
}

export default validarSenhaForte;
