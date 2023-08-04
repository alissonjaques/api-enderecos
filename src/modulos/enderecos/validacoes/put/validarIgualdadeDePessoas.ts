import AppErros from '@compartilhado/erros/AppErros';

function validarIgualdadeDePessoas(
  codigoPessoa: number,
  codigoPessoaEndereco: number,
): void {
  if (codigoPessoa !== codigoPessoaEndereco) {
    throw new AppErros(
      `Não foi possível atualizar o endereço. Motivo: o campo codigoPessoa = ${codigoPessoaEndereco} da pessoa não corresponde ao endereco com codigoPessoa = ${codigoPessoa}.`,
      404,
    );
  }
}

export default validarIgualdadeDePessoas;
