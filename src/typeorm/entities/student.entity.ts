import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'students' })
export class Student {
  @ObjectIdColumn()
  id: ObjectID;
  @Column()
  name: string;
  @Column()
  lastName: string;
  @Column()
  firstName: string;
  @Column()
  birthday: string;
  @Column()
  promotion: string;
  @Column()
  gender: string;
  @Column()
  photo: string;
}
