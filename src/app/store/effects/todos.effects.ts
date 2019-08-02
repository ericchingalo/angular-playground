import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, catchError } from 'rxjs/operators';
import { TodoService } from 'src/app/services/todo.service';
import { EMPTY } from 'rxjs';
import { loadTodoSuccess, addTodoSuccess } from '../actions';

@Injectable()
export class TodoEffects {
  constructor(private actions$: Actions, private todoService: TodoService) {}

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[TODO ACTIONS] load todo'),
      mergeMap(() =>
        this.todoService
          .getAllTodos()
          .map(todos => loadTodoSuccess({ todo: todos }))
      ),
      catchError(() => EMPTY)
    )
  );

  addTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[TODO ACTIONS] add todo'),
      mergeMap((action: any) =>
        this.todoService
          .addTodos(action.todo)
          .map(newTodo => addTodoSuccess({ todo: newTodo }))
      ),
      catchError(() => EMPTY)
    )
  );
}
