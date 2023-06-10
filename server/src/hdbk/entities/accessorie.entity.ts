import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import HDBK from '../hdbk.types';


@Entity('accessories')
export class Accessorie implements HDBK.Accessorie {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 128, nullable: false })
  group: string;
  @Column({ type: 'varchar', length: 128, nullable: false })
  name: string;
}
