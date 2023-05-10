import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Statistic {
  @PrimaryGeneratedColumn('uuid')
  statisticId: string;

  @Column()
  date: Date;

  @Column()
  view: number;
}
