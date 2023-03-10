import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'promotions' })
export class Promotion {
  @ObjectIdColumn()
  id: ObjectID;
  @Column()
  name: string;
  @Column()
  academicYear: string;
  @Column()
  description: string;
  @Column()
  department: string;
  @Column()
  admissionTest: boolean;
  @Column()
  courses: string; // Set of course
}
