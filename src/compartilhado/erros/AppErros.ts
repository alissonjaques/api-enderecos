class AppErros {
  public readonly mensagem: string;
  public readonly statusCode: number;

  constructor(mensagem: string, statusCode = 400) {
    this.mensagem = mensagem;
    this.statusCode = statusCode;
  }
}

export default AppErros;
