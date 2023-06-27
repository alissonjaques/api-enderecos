import AppErros from '@compartilhado/erros/AppErros';
import Endereco from '@modules/enderecos/typeorm/entidades/Endereco';

function validarExisteEnderecoRepetidoNaLista(
  enderecos: Endereco[],
  descricaoMetodo: string,
): void {
  const stringEnderecos = enderecos.map(endereco => JSON.stringify(endereco));
  const setString = new Set<string>(stringEnderecos);

  if (stringEnderecos.length !== setString.size) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} a pessoa no banco de dados.<br>Motivo: existem endereços repetidos na requisição`,
    );
  }
}

export default validarExisteEnderecoRepetidoNaLista;
