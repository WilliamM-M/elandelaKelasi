import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @ObjectIdColumn({ name: 'id' })
  id: string;

  @Column()
  userName: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column()
  email: string;

  @Column()
  userInfo: string;

  @Column()
  phoneNumber: string;
}
