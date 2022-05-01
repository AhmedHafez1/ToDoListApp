import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Groups } from '../shared/enums/groups.enum';
import { Periority } from '../shared/enums/periority.enum';
import { TodoState } from '../shared/enums/todo-state.enum';
import { ToDo } from '../shared/models/todo';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  groups: string[] = [Groups[1], Groups[2], Groups[3]];
  toDoList: ToDo[] = [
    {
      id: 10025,
      title: 'Coffee bears',
      date: new Date('2022/4/11'),
      state: TodoState.Pending,
      deleted: false,
      group: Groups[1],
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      periority: Periority.Low,
      selected: false,
    },
    {
      id: 224503,
      title: 'Football',
      date: new Date('2022/4/30'),
      state: TodoState.Pending,
      deleted: false,
      group: Groups[2],
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      periority: Periority.High,
      selected: false,
    },
    {
      id: 314596,
      title: 'DevOps',
      date: new Date('2022/4/28'),
      state: TodoState.Pending,
      deleted: false,
      group: Groups[3],
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      periority: Periority.Normal,
      selected: false,
    },
    {
      id: 4512,
      title: 'Database',
      date: new Date('2022/5/1'),
      state: TodoState.Pending,
      deleted: false,
      group: Groups[3],

      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      periority: Periority.High,
      selected: false,
    },
    {
      id: 56,
      title: 'Tea',
      date: new Date('2022/5/8'),
      state: TodoState.Pending,
      deleted: false,
      group: Groups[1],
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      periority: Periority.Low,
      selected: false,
    },
    {
      id: 6234,
      title: 'Hand BAll',
      date: new Date('2022/05/9'),
      state: TodoState.Pending,
      deleted: false,
      group: Groups[2],

      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      periority: Periority.Normal,
      selected: false,
    },
    {
      id: 72221,
      title: 'Milk',
      date: new Date('2022/4/16'),
      state: TodoState.Pending,
      deleted: false,
      group: Groups[1],
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      periority: Periority.High,
      selected: false,
    }
  ];

  constructor() {}

  get allGroups() {
    return this.groups;
  }

  getTodos() {
    return this.toDoList.slice();
  }

  deleteTodos(toDos: number[]) {
    toDos.forEach((id) => {
      const index = this.toDoList.findIndex((todo) => todo.id === id);
      this.toDoList[index].deleted = true;
    });
  }

  completeTodos(toDos: number[]) {
    toDos.forEach((id) => {
      const index = this.toDoList.findIndex((todo) => todo.id === id);
      this.toDoList[index].state = TodoState.Done;
    });
  }

  addTodo(todo: ToDo) {
    this.toDoList.push(todo);
  }

  getTodo(id: number) {
    return of(this.toDoList.find((todo) => todo.id === id));
  }
}
