import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnChanges {
  @Input() todo: Todo;
  constructor() {}

  ngOnInit() {}

  ngOnChanges() {}

  onComplete(e) {
    e.stopPropagation();
  }
}
