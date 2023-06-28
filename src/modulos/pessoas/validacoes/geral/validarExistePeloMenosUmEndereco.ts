import AppErros from '@compartilhado/erros/AppErros';
import Endereco from '@modules/enderecos/typeorm/entidades/Endereco';

function validarExistePeloMenosUmEndereco(
  enderecos: Endereco[],
  descricaoMetodo: string,
): void {
  if (!enderecos) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} a pessoa no banco de dados.<br>Motivo: o campo enderecos é obrigatório`,
    );
  } else if (Object.keys(enderecos).length == 0) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} a pessoa no banco de dados.<br>Motivo: é obrigatório informar ao menos um endereço para a pessoa`,
    );
  }
}

export default validarExistePeloMenosUmEndereco;
