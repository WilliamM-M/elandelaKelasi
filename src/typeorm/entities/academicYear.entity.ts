import { Column, Double, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'academicYears' })
export class AcademicYear {
  @ObjectIdColumn()
  id: ObjectID;
  @Column()
  startYear: string;
  @Column()
  endingYear: string;
  @Column()
  status: string;
}
