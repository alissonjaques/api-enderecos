import Endereco from '@modules/enderecos/typeorm/entidades/Endereco';
import Municipio from '@modules/municipios/typeorm/entidades/Municipio';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity('TB_BAIRRO')
class Bairro {
  @PrimaryColumn({
    name: 'CODIGO_BAIRRO',
    type: 'number',
  })
  codigoBairro: number;

  @ManyToOne(() => Municipio, municipio => municipio.bairros)
  @JoinColumn({ name: 'CODIGO_MUNICIPIO' })
  municipio: Municipio;

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

  @OneToMany(() => Endereco, endereco => endereco.bairro)
  enderecos: Endereco[];
}

export default Bairro;
