import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
//A very common search request will be retrieving an Event based on its "name" => use @Index() to improve performance.
@Index(['name', 'type'])
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column('json')
  payload: Record<string, any>;
}
