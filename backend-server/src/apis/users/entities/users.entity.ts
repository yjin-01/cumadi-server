import { Post } from 'src/apis/posts/entities/posts.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  nickname: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  introduction: string;

  @ManyToMany(() => Post, (posts) => posts.users)
  posts: Post;
}
