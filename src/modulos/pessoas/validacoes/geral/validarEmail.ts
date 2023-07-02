import AppErros from '@compartilhado/erros/AppErros';

function validarEmail(login: string, descricaoMetodo: string): void {
  const expressaoRegularEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!expressaoRegularEmail.test(login)) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} a pessoa no banco de dados.<br>Motivo: o campo login deve ser um email (exemplo: nome@email.com), mas você passou: ${login}.`,
    );
  }
}

export default validarEmail;
