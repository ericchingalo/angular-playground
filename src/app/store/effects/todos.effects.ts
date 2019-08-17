import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  mergeMap,
  catchError,
  switchMap,
  map,
  takeUntil
} from 'rxjs/operators';
import { TodoService } from 'src/app/services/todo.service';
import { of, defer } from 'rxjs';
import {
  loadTodoSuccess,
  addTodoSuccess,
  loadTodoFail,
  addTodo,
  loadTodo,
  addTodoFail
} from '../actions';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Injectable()
export class TodoEffects {
  constructor(
    private actions$: Actions,
    private todoService: TodoService,
    private subscriptionService: SubscriptionService
  ) {}

  addTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[TODO ACTIONS] add todo'),
      switchMap((action: any) =>
        this.todoService
          .create(action.todo)
          .then(() => addTodoSuccess({ todo: action.todo }))
      ),
      catchError(error => of(addTodoFail(error)))
    )
  );

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[TODO ACTIONS] load todo'),
      switchMap(() =>
        this.todoService.findAll().pipe(
          takeUntil(this.subscriptionService.unsubscribe$),
          map(todos => loadTodoSuccess({ todo: todos }))
        )
      ),
      catchError(error => of(loadTodoFail(error)))
    )
  );

  $init = createEffect(() => defer(() => of(loadTodo())));
}
