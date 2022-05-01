import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TodoState } from '../shared/enums/todo-state.enum';
import { ToDo } from '../shared/models/todo';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: ToDo;
  @Output() selectionToggle = new EventEmitter<boolean>();
  @Output() deleteAction = new EventEmitter<number>();
  @Output() doneAction = new EventEmitter<number>();

  state = TodoState;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onCheckBoxToggle(value: boolean) {
    this.selectionToggle.emit(value);
  }

  onDelete() {
    this.deleteAction.emit(this.todo.id);
  }

  onDone() {
    this.doneAction.emit(this.todo.id);
  }

  openDetails() {
    this.router.navigateByUrl(`/details/${this.todo.id}`);
  }
}
