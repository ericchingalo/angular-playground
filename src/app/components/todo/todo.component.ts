import { Component, OnInit, Input } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  @Input() todo: Todo;
  constructor() {}

  ngOnInit() {}

  onComplete(e) {
    e.stopPropagation();
  }
}
