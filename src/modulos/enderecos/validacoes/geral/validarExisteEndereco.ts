import AppErros from '@compartilhado/erros/AppErros';
import { RepositorioEndereco } from '@modules/enderecos/typeorm/repositorios/RepositorioEndereco';

async function validarExisteEndereco(
  codigoEndereco: number,
  repositorioEndereco: RepositorioEndereco,
  descricaoMetodo: string,
): Promise<void> {
  const endereco = await repositorioEndereco.findOne(codigoEndereco);

  if (!endereco) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} o endereço. Motivo: endereço com codigoEndereco = ${codigoEndereco} não encontrado.`,
      404,
    );
  }
}

export default validarExisteEndereco;
