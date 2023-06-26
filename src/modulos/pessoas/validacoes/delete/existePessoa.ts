import { RepositorioPessoa } from '../../typeorm/repositorios/RepositorioPessoa';
import AppErros from '@compartilhado/erros/AppErros';
import Pessoa from '../../typeorm/entidades/Pessoa';

async function existePessoa(
  codigo_pessoa: number,
  repositorioPessoa: RepositorioPessoa,
  descricaoMetodo: string,
): Promise<Pessoa> {
  const pessoa = await repositorioPessoa.findOne(codigo_pessoa);

  if (!pessoa) {
    throw new AppErros(
      `Não foi possível ${descricaoMetodo} a pessoa com codigoPessoa = ${codigo_pessoa}.<br>Motivo: pessoa não encontrada.`,
      404,
    );
  }
  return pessoa;
}

export default existePessoa;
