import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Periority } from '../shared/enums/periority.enum';
import { ToDo } from '../shared/models/todo';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss'],
})
export class TodoDetailsComponent implements OnInit {
  todo: ToDo | undefined;
  periority = Periority;

  constructor(
    private activeRoute: ActivatedRoute,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.getTodoDetails();
  }

  getTodoDetails() {
    let id: number;
    this.activeRoute.params.subscribe((params) => {
      id = +params['id'];

      if (id) {
        this.todoService
          .getTodoById(id)
          .subscribe((todo) => (this.todo = todo));
      }
    });
  }
}
