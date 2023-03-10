import { Column, Double, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'programs' })
export class Program {
  @ObjectIdColumn()
  id: ObjectID;
  @Column()
  promotion: string;
  @Column()
  course: string;
  @Column()
  academicYear: string;
  @Column()
  stage: string;
  @Column()
  day: string;
  @Column()
  startingHour: string;
  @Column()
  endingHour: string;
  @Column()
  IsMorningCourse: boolean;
}
