import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Todo } from '../../models/todo.model';
import { addTodo, loadTodo } from '../../store/actions';
import { Observable } from 'rxjs';
import { selectAllTodoList, currentTodoCount } from 'src/app/store/selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  todos$: Observable<any>;
  todosCount$: Observable<any>;

  todoText: string;
  constructor(private store: Store<{ Todo }>) {}

  ngOnInit() {
    this.todos$ = this.store.select(selectAllTodoList);
    this.todosCount$ = this.store.select(currentTodoCount);
  }

  addTodo(e) {
    e.stopPropagation();
    const myTodo: Todo = {
      text: this.todoText,
      completed: false
    };
    this.store.dispatch(addTodo({ todo: myTodo }));
    this.todoText = '';
  }
}
