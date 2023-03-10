import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @ObjectIdColumn()
  id: ObjectID;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column()
  role: string;
  @Column()
  email: string;
  @Column()
  userInfos: string;
  @Column()
  phoneNumber: string;
}
