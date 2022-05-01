import { Groups } from '../enums/groups.enum';
import { Periority } from '../enums/periority.enum';
import { TodoState } from '../enums/todo-state.enum';

export interface ToDo {
  id: number;
  title: string;
  date: Date;
  state: TodoState;
  group: string;
  deleted: boolean;
  description: string;
  periority: Periority;
  selected: boolean;
}
