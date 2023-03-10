import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'roles' })
export class Role {
  @ObjectIdColumn()
  id: ObjectID;
  @Column()
  description: string;
  @Column()
  name: string;
}
