import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TodoState } from '../shared/enums/todo-state.enum';
import { isEqualDates } from '../shared/helper/date-compare';
import { Filter } from '../shared/models/filter';
import { ToDo } from '../shared/models/todo';
import { RepositoryService } from './repository.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private updateTodos$ = new BehaviorSubject<ToDo[]>([]);

  private toDos: ToDo[] = [];

  constructor(private repository: RepositoryService) {
    this.getTodos();
  }

  updatedTodos() {
    return this.updateTodos$.asObservable();
  }

  deleteTodos(todos: number[]) {
    this.repository.deleteTodos(todos);
  }

  doneTodos(todos: number[]) {
    this.repository.completeTodos(todos);
    this.updateTodos$.next(this.toDos);
  }

  addTodoItem(todo: ToDo) {
    this.repository.addTodo(todo);
    this.getTodos();
    this.updateTodos$.next(this.toDos);
  }

  getTodos(filterData?: Filter) {
    if (filterData) {
      this.filterTodos(filterData);
    } else {
      this.toDos = this.repository.toDoList.filter((todo) => !todo.deleted);
    }

    this.updateTodos$.next(this.toDos);
  }

  filterTodos(filterData: Filter) {
    this.toDos = this.repository.toDoList
      .filter((todo) => todo.title.toLowerCase().includes(filterData.title.toLowerCase()))
      .filter((todo) =>
        filterData.date
          ? todo.date.getTime() === filterData.date.getTime()
          : true
      )
      .filter((todo) =>
        filterData.groups.length > 0
          ? filterData.groups.includes(todo.group)
          : true
      )
      .filter((todo) => !todo.deleted);
  }

  getTodoById(id: number) {
    return this.repository.getTodo(id);
  }

  getTodayTodos() {
    this.toDos = this.repository.toDoList.filter((todo) => {
      return isEqualDates(new Date(), todo.date) && !todo.deleted;
    });
    this.updateTodos$.next(this.toDos);
  }

  getWeekTodos() {
    // Next Wee Tasks

    let weekDate = new Date();
    weekDate.setDate(weekDate.getDate() + 7);

    this.toDos = this.repository.toDoList.filter(
      (todo) =>
        todo.date.getTime() < weekDate.getTime() &&
        todo.date.getTime() > new Date().getTime() &&
        !todo.deleted
    );

    this.updateTodos$.next(this.toDos);
  }

  getDoneTodos() {
    this.toDos = this.repository.toDoList.filter(
      (todo) => todo.state === TodoState.Done && !todo.deleted
    );

    this.updateTodos$.next(this.toDos);
  }

  getDletedTodos() {
    this.toDos = this.repository.toDoList.filter((todo) => todo.deleted);

    this.updateTodos$.next(this.toDos);
  }

  getTodosByGroup(group: string) {
    this.toDos = this.repository.toDoList.filter(
      (todo) => todo.group === group && !todo.deleted
    );

    this.updateTodos$.next(this.toDos);
  }
}
