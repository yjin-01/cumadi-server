import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Memo {
  @PrimaryGeneratedColumn('uuid')
  memoId: string;

  @Column({ length: 100 })
  parse: string;
}
