import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity('teachers')
export class Teacher {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  lastName: string;

  @Column()
  firstName: string;

  @Column()
  middleName: string;

  @Column()
  teacherNumber: string;

  @Column()
  grade: string;

  @Column()
  role: string;

  @Column()
  gender: string;
}
