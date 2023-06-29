import AppErros from '@compartilhado/erros/AppErros';
import { RepositorioPessoa } from '@modules/pessoas/typeorm/repositorios/RepositorioPessoa';

async function validarExistePessoa(
  codigoPessoa: number,
  repositorioPessoa: RepositorioPessoa,
  descricaoMetodo: string,
): Promise<void> {
  const pessoa = await repositorioPessoa.findOne(codigoPessoa);

  if (!pessoa) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} o endereço.<br>Motivo: pessoa com codigoPessoa = ${codigoPessoa} não encontrada.`,
      404,
    );
  }
}

export default validarExistePessoa;
