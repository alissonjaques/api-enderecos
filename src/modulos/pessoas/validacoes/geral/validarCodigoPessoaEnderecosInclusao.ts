import AppErros from '@compartilhado/erros/AppErros';

function validarCodigoPessoaEnderecosInclusao(
  enderecos: any[],
  codigoPessoa: number,
): void {
  for (let i = 0; i < enderecos.length; i++) {
    const endereco = enderecos[i];
    if (endereco.codigoPessoa && endereco.codigoPessoa !== codigoPessoa) {
      throw new AppErros(
        `Não foi possível inserir o endereço no banco de dados.<br>Motivo: o campo codigoPessoa = ${codigoPessoa} da pessoa é diferente do campo codigoPessoa = ${endereco.codigoPessoa} do endereço`,
      );
    }
  }
}

export default validarCodigoPessoaEnderecosInclusao;
