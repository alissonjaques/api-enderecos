import Bairro from '@modules/bairros/typeorm/entidades/Bairro';
import Pessoa from '@modules/pessoas/typeorm/entidades/Pessoa';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('TB_ENDERECO')
class Endereco {
  @PrimaryColumn({
    name: 'CODIGO_ENDERECO',
    type: 'number',
  })
  codigoEndereco: number;

  @ManyToOne(() => Pessoa, pessoa => pessoa.enderecos)
  @JoinColumn({ name: 'CODIGO_PESSOA' })
  pessoa: Pessoa;

  @ManyToOne(() => Bairro, bairro => bairro.enderecos)
  @JoinColumn({ name: 'CODIGO_BAIRRO' })
  bairro: Bairro;

  @Column({
    name: 'NOME_RUA',
    type: 'varchar2',
  })
  nomeRua: string;

  @Column({
    name: 'NUMERO',
    type: 'varchar2',
  })
  numero: string;

  @Column({
    name: 'COMPLEMENTO',
    type: 'varchar2',
  })
  complemento: string;

  @Column({
    name: 'CEP',
    type: 'varchar2',
  })
  cep: string;
}

export default Endereco;
