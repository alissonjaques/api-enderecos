import AppErros from '@compartilhado/erros/AppErros';
import Endereco from '@modules/enderecos/typeorm/entidades/Endereco';
import { RepositorioEndereco } from '@modules/enderecos/typeorm/repositorios/RepositorioEndereco';

async function existeEndereco(
  codigo_endereco: number,
  repositorioEndereco: RepositorioEndereco,
  descricaoMetodo: string,
): Promise<Endereco> {
  const endereco = await repositorioEndereco.findOne(codigo_endereco);

  if (!endereco) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} o endereço com codigoEndereco = ${codigo_endereco}.<br>Motivo: endereço não encontrado.`,
      404,
    );
  }
  return endereco;
}

export default existeEndereco;
