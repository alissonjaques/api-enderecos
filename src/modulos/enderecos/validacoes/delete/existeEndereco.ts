import AppErros from '@compartilhado/erros/AppErros';
import Endereco from '@modules/enderecos/typeorm/entidades/Endereco';
import { RepositorioEndereco } from '@modules/enderecos/typeorm/repositorios/RepositorioEndereco';

async function existeEndereco(
  codigoEndereco: number,
  repositorioEndereco: RepositorioEndereco,
  descricaoMetodo: string,
): Promise<Endereco> {
  const endereco = await repositorioEndereco.findOne(codigoEndereco);

  if (!endereco) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} o endereço com codigoEndereco = ${codigoEndereco}.<br>Motivo: endereço não encontrado.`,
      404,
    );
  }

  return endereco;
}

export default existeEndereco;
