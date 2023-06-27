import Municipio from '@modules/municipios/typeorm/entidades/Municipio';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('TB_BAIRRO')
class Bairro {
  @PrimaryColumn({
    name: 'CODIGO_BAIRRO',
    type: 'number',
  })
  codigoBairro: number;

  @ManyToOne(() => Municipio)
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
}

export default Bairro;
