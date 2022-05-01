import { Groups } from '../enums/groups.enum';

export class Filter {
  constructor(
    public date: Date,
    public title: string,
    public groups: string[]
  ) {}
}
