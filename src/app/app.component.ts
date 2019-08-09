import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Todo } from './models/todo.model';
import { loadTodo } from './store/actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<Todo>) {}
  ngOnInit() {
    this.store.dispatch(loadTodo());
  }
}
