import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, catchError, switchMap, map } from 'rxjs/operators';
import { TodoService } from 'src/app/services/todo.service';
import { EMPTY, of } from 'rxjs';
import {
  loadTodoSuccess,
  addTodoSuccess,
  loadTodoFail,
  addTodo,
  loadTodo,
  addTodoFail
} from '../actions';

@Injectable()
export class TodoEffects {
  constructor(private actions$: Actions, private todoService: TodoService) {}

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodo),
      switchMap(() =>
        this.todoService
          .findAll()
          .pipe(map(todos => loadTodoSuccess({ todo: todos })))
      ),
      catchError(error => of(loadTodoFail(error)))
    )
  );

  addTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTodo),
      mergeMap((action: any) =>
        this.todoService
          .create(action.todo)
          .then(newTodo => addTodoSuccess({ todo: action.todo }))
      ),
      catchError(error => of(addTodoFail(error)))
    )
  );
}
