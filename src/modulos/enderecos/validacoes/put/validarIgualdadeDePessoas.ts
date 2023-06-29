import AppErros from '@compartilhado/erros/AppErros';

function validarIgualdadeDePessoas(
  codigoPessoa: number,
  codigoPessoaEndereco: number,
): void {
  if (codigoPessoa !== codigoPessoaEndereco) {
    throw new AppErros(
      `Não foi possível atualizar o endereço.<br>Motivo: o campo codigoPessoa = ${codigoPessoaEndereco} do endereço  não corresponde à pessoa com codigoPessoa = ${codigoPessoa}.`,
      404,
    );
  }
}

export default validarIgualdadeDePessoas;
