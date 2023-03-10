import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'teachers' })
export class Teacher {
  @ObjectIdColumn()
  id: ObjectID;
  @Column()
  name: string;
  @Column()
  lastName: string;
  @Column()
  firstName: string;
  @Column()
  middleName: string;
  @Column()
  grade: string;
  @Column()
  gender: string;
}
