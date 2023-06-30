import Municipio from '@modules/municipios/typeorm/entidades/Municipio';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('TB_UF')
class Uf {
  @PrimaryColumn({
    name: 'CODIGO_UF',
    type: 'number',
  })
  codigoUF: number;

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

  @OneToMany(() => Municipio, municipio => municipio.uf)
  municipios: Municipio[];
}

export default Uf;
