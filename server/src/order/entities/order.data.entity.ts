import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order_data')
export class OrderData {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 128, nullable: false })
  name: string;

  @Column({ type: 'jsonb', nullable: false, default: {} })
  data: object;
}
