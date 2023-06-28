import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('TB_PESSOA')
class Pessoa {
  @PrimaryColumn({
    name: 'CODIGO_PESSOA',
    type: 'number',
  })
  codigoPessoa: number;

  @Column({
    name: 'NOME',
    type: 'varchar2',
  })
  nome: string;

  @Column({
    name: 'SOBRENOME',
    type: 'varchar2',
  })
  sobrenome: string;

  @Column({
    name: 'IDADE',
    type: 'number',
  })
  idade: number;

  @Column({
    name: 'LOGIN',
    type: 'varchar2',
  })
  login: string;

  @Column({
    name: 'SENHA',
    type: 'varchar2',
  })
  senha: string;

  @Column({
    name: 'STATUS',
    type: 'number',
  })
  status: number;
}

export default Pessoa;
