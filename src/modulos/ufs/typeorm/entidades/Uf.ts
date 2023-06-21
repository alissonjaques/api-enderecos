import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('TB_UF')
class Uf {
  @PrimaryColumn({
    name: 'CODIGO_UF',
    type: 'number',
  })
  codigo_uf: number;

  @Column({
    name: 'SIGLA',
    type: 'varchar2',
  })
  sigla: string;

  @Column({
    name: 'NOME',
    type: 'varchar2',
  })
  nome: string;

  @Column({
    name: 'STATUS',
    type: 'number',
  })
  status: number;
}

export default Uf;
