import { Entity } from 'typeorm';

@Entity()
export class TodoEntity {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
  notes?: string;
}