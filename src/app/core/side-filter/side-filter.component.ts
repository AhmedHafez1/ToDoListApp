import { Component, OnInit } from '@angular/core';
import { Groups } from '../../shared/enums/groups.enum';
import { TodoService } from '../../services/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-filter',
  templateUrl: './side-filter.component.html',
  styleUrls: ['./side-filter.component.scss']
})
export class SideFilterComponent implements OnInit {

  groups = Groups;
  constructor(private todoService: TodoService, private router: Router) { }

  ngOnInit(): void {
  }

  getAllTodos() {
    this.navigateToHome();
    this.todoService.getTodos();
  }

  getTodayTodos() {
    this.navigateToHome();
    this.todoService.getTodayTodos();
  }

  getWeekTodos() {
    this.navigateToHome();
    this.todoService.getWeekTodos();
  }

  getDoneTodos() {
    this.navigateToHome();
    this.todoService.getDoneTodos();
  }

  getDletedTodos() {
    this.navigateToHome();
    this.todoService.getDletedTodos();
  }

  getTodosByGroup(group: string) {
    this.navigateToHome();
    this.todoService.getTodosByGroup(group);
  }

  navigateToHome() {
    this.router.navigateByUrl("/list");
  }
}
