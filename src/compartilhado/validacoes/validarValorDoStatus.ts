import AppErros from '@compartilhado/erros/AppErros';

function validarValorDoStatus(status: number, descricao: string): void {
  if (status !== 1 && status !== 2) {
    throw new AppErros(
      `Não foi possível ${descricao} no banco de dados.<br>Motivo: o campo status dever ser 1 ou 2, valor passado = ${status}.`,
    );
  }
}

export default validarValorDoStatus;
