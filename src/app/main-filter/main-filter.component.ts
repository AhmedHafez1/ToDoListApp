import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Groups } from '../shared/enums/groups.enum';
import { Filter } from '../shared/models/filter';
import { RepositoryService } from '../services/repository.service';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-main-filter',
  templateUrl: './main-filter.component.html',
  styleUrls: ['./main-filter.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class MainFilterComponent implements OnInit {
  groupCtrl = new FormControl();

  searchText = '';
  filterDate!: Date;
  filterGroups: string[] = [];

  groups: string[] = [];

  @ViewChild('groupInput') groupInput!: ElementRef<HTMLInputElement>;

  constructor(
    public repository: RepositoryService,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.groups = this.repository.allGroups;
  }

  // Groupd Filter & AutoComplete Start

  remove(group: string): void {
    const index = this.filterGroups.indexOf(group);

    if (index >= 0) {
      this.filterGroups.splice(index, 1);
      this.updateSelectedGroups();
      this.filterToDosList();
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.filterGroups.push(event.option.value);
    this.groupInput.nativeElement.value = '';
    this.groupCtrl.setValue(null);
    this.updateSelectedGroups();
    this.filterToDosList();
  }

  lookupGroup(event: Event) {
    const text = (event?.target as HTMLInputElement)?.value.toString();

    if (text) {
      this.groups = this.repository.allGroups.filter((g) => g.includes(text));
    } else {
      this.groups = this.repository.allGroups.filter(
        (g) => !this.filterGroups.includes(g)
      );
    }
  }

  getGroups() {
    return this.groups;
  }

  updateSelectedGroups() {
    this.groups = this.repository.allGroups.filter(
      (g) => !this.filterGroups.includes(g)
    );
  }
  // Groupd Filter & AutoComplete End

  filterToDosList() {
    const filterData = new Filter(
      this.filterDate,
      this.searchText,
      this.filterGroups
    );
    this.todoService.getTodos(filterData);
  }
}
