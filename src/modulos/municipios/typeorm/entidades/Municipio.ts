import Uf from '@modules/ufs/typeorm/entidades/Uf';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('TB_MUNICIPIO')
class Municipio {
  @PrimaryColumn({
    name: 'CODIGO_MUNICIPIO',
    type: 'number',
  })
  codigoMunicipio: number;

  @ManyToOne(() => Uf)
  @JoinColumn({ name: 'CODIGO_UF' })
  uf: Uf;

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

export default Municipio;
