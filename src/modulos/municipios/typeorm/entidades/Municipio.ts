import Bairro from '@modules/bairros/typeorm/entidades/Bairro';
import Uf from '@modules/ufs/typeorm/entidades/Uf';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity('TB_MUNICIPIO')
class Municipio {
  @PrimaryColumn({
    name: 'CODIGO_MUNICIPIO',
    type: 'number',
  })
  codigoMunicipio: number;

  @ManyToOne(() => Uf, uf => uf.municipios)
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

  @OneToMany(() => Bairro, bairro => bairro.municipio)
  bairros: Bairro[];
}

export default Municipio;
