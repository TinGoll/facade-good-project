import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import HDBK from '../hdbk.types';

@Entity('materials')
export class Material implements HDBK.Material {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 128, nullable: false })
  name: string;
  @Column({ type: 'varchar', length: 128, nullable: false })
  type: string;
}
