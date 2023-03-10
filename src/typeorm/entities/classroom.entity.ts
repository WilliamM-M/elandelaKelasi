import { Column, Double, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'classrooms' })
export class Classroom {
  @ObjectIdColumn()
  id: ObjectID;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  type: string;
  @Column()
  capacity: string;
}
