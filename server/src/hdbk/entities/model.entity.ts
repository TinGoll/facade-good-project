import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import HDBK from '../hdbk.types';

@Entity('models')
export class Model implements HDBK.Model {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 128, nullable: false })
  name: string;
  @Column({ type: 'jsonb', default: [] })
  materials: string[];
}
