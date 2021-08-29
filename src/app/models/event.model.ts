import { Task } from './task.model';

export class Event {
  id?: string;
  name?: string;
  dueDate?: string;
  tasks?: Task[];
}
