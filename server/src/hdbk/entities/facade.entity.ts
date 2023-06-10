import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import HDBK from '../hdbk.types';

@Entity('facades')
export class Facade implements HDBK.Facade {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 128, nullable: false })
  name: string;
}
