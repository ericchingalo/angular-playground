import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Todo } from '../../models/todo.model';
import { addTodoSuccess } from '../../store/actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  todos$: Observable<any>;

  todoText: string;
  constructor(private router: Router, private store: Store<{ Todo }>) {}

  ngOnInit() {
    this.todos$ = this.store.pipe(select('todos'));
    const href = `localhost:4200${this.router.url}`;
    console.log(href);
  }

  addTodo(e) {
    e.stopPropagation();
    const myTodo: Todo = {
      text: this.todoText,
      completed: false
    };
    this.store.dispatch(addTodoSuccess({ todo: myTodo }));
    this.todoText = '';
  }
}
