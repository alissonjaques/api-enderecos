import AppErros from '@compartilhado/erros/AppErros';
import Bairro from '@modules/bairros/typeorm/entidades/Bairro';
import { RepositorioBairro } from '@modules/bairros/typeorm/repositorios/RepositorioBairro';

async function existeBairro(
  codigoBairro: number,
  repositorioBairro: RepositorioBairro,
  descricaoMetodo: string,
): Promise<Bairro> {
  const bairro = await repositorioBairro.findOne(codigoBairro);

  if (!bairro) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} o bairro com codigoBairro = ${codigoBairro}. Motivo: bairro não encontrado.`,
      404,
    );
  }
  return bairro;
}

export default existeBairro;
