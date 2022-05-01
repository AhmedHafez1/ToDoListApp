import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Groups } from '../shared/enums/groups.enum';
import { ToDo } from '../shared/models/todo';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  toDoListGroup_1: ToDo[] = [];
  toDoListGroup_2: ToDo[] = [];
  toDoListGroup_3: ToDo[] = [];

  selectedTodos: number[] = [];

  groups = Groups;

  subscription!: Subscription;

  showDeleted = false;

  constructor(public todoService: TodoService, private router: Router) {}

  ngOnInit(): void {
    this.updateTodos();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updateTodos() {
    this.subscription = this.todoService.updatedTodos().subscribe((toDos) => {

      this.toDoListGroup_1 = this.toDoListGroup_2 = this.toDoListGroup_3 = [];

      this.toDoListGroup_1 = toDos.filter((todo) => todo.group === Groups[1]);
      this.toDoListGroup_2 = toDos.filter((todo) => todo.group === Groups[2]);
      this.toDoListGroup_3 = toDos.filter((todo) => todo.group === Groups[3]);

      if (toDos.every((todo) => todo.deleted)) {
        this.showDeleted = true;
      } else {
        this.showDeleted = false;
      }

      this.clearSelection();
    });
  }

  onSelectionChange(checked: boolean, todo: ToDo) {
    if (checked) {
      this.selectedTodos.push(todo.id);
    } else {
      const index = this.selectedTodos.findIndex((id) => id === todo.id);
      this.selectedTodos.splice(index, 1);
    }
  }

  onDelete(todoIds: number[]) {
    this.todoService.deleteTodos(todoIds);
    this.toDoListGroup_1.forEach((todo) => {
      if (todoIds.includes(todo.id)) {
        todo.deleted = true;
      }
    });
    this.toDoListGroup_2.forEach((todo) => {
      if (todoIds.includes(todo.id)) {
        todo.deleted = true;
      }
    });
    this.toDoListGroup_3.forEach((todo) => {
      if (todoIds.includes(todo.id)) {
        todo.deleted = true;
      }
    });

    this.clearSelection();
  }

  onDone(todoIds: number[]) {
    this.todoService.doneTodos(todoIds);
  }

  openAddNewTodo() {
    this.router.navigateByUrl('/new');
  }

  clearSelection() {
    this.selectedTodos = [];
    this.toDoListGroup_1.forEach((todo) => {
      todo.selected = false;
    });
    this.toDoListGroup_2.forEach((todo) => {
      todo.selected = false;
    });
    this.toDoListGroup_3.forEach((todo) => {
      todo.selected = false;
    });
  }
}
