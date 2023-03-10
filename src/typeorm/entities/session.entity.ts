import { Column, Double, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'sessions' })
export class Session {
  @ObjectIdColumn()
  id: ObjectID;
  @Column()
  date: Date;
  @Column()
  academicYear: string;
  @Column()
  teacher: string;
  @Column()
  course: string;
  @Column()
  theoryHours: string;
  @Column()
  tpHours: string;
  @Column()
  labHours: string;
  @Column()
  classroom: string;
  @Column()
  student: string; // Set of students
  @Column()
  status: string;
}
