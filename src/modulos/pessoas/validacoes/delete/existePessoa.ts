import { RepositorioPessoa } from '../../typeorm/repositorios/RepositorioPessoa';
import AppErros from '@compartilhado/erros/AppErros';
import Pessoa from '../../typeorm/entidades/Pessoa';

async function existePessoa(
  codigoPessoa: number,
  repositorioPessoa: RepositorioPessoa,
  descricaoMetodo: string,
): Promise<Pessoa> {
  const pessoa = await repositorioPessoa.findOne(codigoPessoa);

  if (!pessoa) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} a pessoa com codigoPessoa = ${codigoPessoa}. Motivo: pessoa não encontrada.`,
      404,
    );
  }
  return pessoa;
}

export default existePessoa;
