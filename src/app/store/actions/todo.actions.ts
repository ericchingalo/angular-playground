import { createAction, props } from '@ngrx/store';
import { Todo } from '../../models/todo.model';

export const addTodo = createAction(
  '[TODO ACTIONS] add todo',
  props<{ todo: Todo }>()
);

export const addTodoFail = createAction(
  '[TODO ACTIONS] add todo fail',
  props<{ error: string }>()
);

export const addTodoSuccess = createAction(
  '[TODO ACTIONS] add todo success',
  props<{ todo: Todo }>()
);
