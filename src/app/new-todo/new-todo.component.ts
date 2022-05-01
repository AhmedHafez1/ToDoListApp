import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Groups } from '../shared/enums/groups.enum';
import { Periority } from '../shared/enums/periority.enum';
import { TodoState } from '../shared/enums/todo-state.enum';
import { ToDo } from '../shared/models/todo';
import { RepositoryService } from '../services/repository.service';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.scss'],
})
export class NewTodoComponent implements OnInit {
  todoForm!: FormGroup;
  groups: string[] = [];

  periorities = [Periority.Low, Periority.Normal, Periority.High];

  constructor(
    private formBuilder: FormBuilder,
    private repository: RepositoryService,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.groups = this.repository.allGroups;
  }

  initForm() {
    this.todoForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      periority: [undefined, Validators.required],
      delivery: [undefined, Validators.required],
      group: [undefined, Validators.required],
    });
  }

  reset() {
    this.todoForm.reset();
  }

  addTodo() {
    if (this.todoForm.valid) {
      const addedTodo: ToDo = {
        id: Math.floor(Math.random() * 1000000) + 1,
        title: this.todoForm.controls['title'].value,
        description: this.todoForm.controls['description'].value,
        periority: this.todoForm.controls['periority'].value,
        date: this.todoForm.controls['delivery'].value,
        group: this.todoForm.controls['group'].value,
        state: TodoState.Pending,
        deleted: false,
        selected: false
      };

      this.todoService.addTodoItem(addedTodo);
      this.reset();
    }
  }
}
