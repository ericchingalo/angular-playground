import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Todo } from '../../models/todo.model';
import { addTodo, loadTodo } from '../../store/actions';
import { Observable } from 'rxjs';
import { selectAllTodoList, currentTodoCount } from 'src/app/store/selectors';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  todos$: Observable<any>;
  todosCount$: Observable<any>;

  todoText: string;
  constructor(
    private store: Store<{ Todo }>,
    private subscriptionService: SubscriptionService
  ) {}

  ngOnInit() {
    this.todos$ = this.store.select(selectAllTodoList);
    this.todosCount$ = this.store.select(currentTodoCount);
  }

  ngOnDestroy() {
    this.subscriptionService.unsubcribeComponents$.next();
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
