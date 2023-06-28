import AppErros from '@compartilhado/erros/AppErros';
import { RepositorioBairro } from '@modules/bairros/typeorm/repositorios/RepositorioBairro';

async function validarExisteBairro(
  codigoBairro: number,
  repositorioBairro: RepositorioBairro,
  descricaoMetodo: string,
): Promise<void> {
  const bairro = await repositorioBairro.findOne(codigoBairro);

  if (!bairro) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} o endereço.<br>Motivo: bairro com codigoBairro = ${codigoBairro} não encontrado.`,
      404,
    );
  }
}

export default validarExisteBairro;
