import { Column, Double, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'courses' })
export class Course {
  @ObjectIdColumn()
  id: ObjectID;
  @Column()
  title: string;
  @Column()
  code: string;
  @Column()
  hoursTheory: string;
  @Column()
  hoursLab: string;
  @Column()
  weighting: string;
  @Column()
  onlyTheory: boolean;
  @Column()
  onlyTP: boolean;
  @Column()
  onlyLab: boolean;
}
