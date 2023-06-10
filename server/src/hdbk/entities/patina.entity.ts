import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import HDBK from '../hdbk.types';

@Entity('patinas')
export class Patina implements HDBK.Patina {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 128, nullable: false })
  name: string;
}
