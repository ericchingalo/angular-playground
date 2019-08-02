import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
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

export const loadTodo = createAction('[TODO ACTIONS] load todo');

export const loadTodoFail = createAction(
  '[TODO ACTIONS] load todo fail',
  props<{ error: string }>()
);

export const loadTodoSuccess = createAction(
  '[TODO ACTIONS] load todo sucess',
  props<{ todo: Todo }>()
);

export const completeTodo = createAction(
  '[TODO ACTIONS] complete todo',
  props<{ todo: Todo }>()
);
export const completeTodoFail = createAction(
  '[TODO ACTIONS]complete todo fail',
  props<{ error: string }>()
);
export const completeTodoSuccess = createAction(
  '[TODO ACTIONS]complete todo success',
  props<{ todo: Update<Todo> }>()
);
