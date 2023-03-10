import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'complementCourses' })
export class ComplementCourse {
  @ObjectIdColumn()
  id: ObjectID;
  @Column()
  academicYear: string;
  @Column()
  student: string;
  @Column()
  course: string;
}
