import { Todo } from 'src/app/models/todo.model';
import { createReducer, on, Action } from '@ngrx/store';

import * as TodoActions from '../actions/todo.actions';

export interface TodoState {
  todos: Todo[];
  adding: boolean;
  added: boolean;
  hasError: boolean;
}

export const initialState: TodoState = {
  todos: [],
  adding: false,
  added: false,
  hasError: false
};

const reducer = createReducer(
  initialState,
  on(TodoActions.addTodo, (state, { todo }) => ({
    ...state,
    adding: true,
    hasError: false,
    added: false
  })),
  on(TodoActions.addTodoFail, (state, { error }) => ({
    ...state,
    hasError: false,
    added: false,
    adding: false
  })),
  on(TodoActions.addTodoSuccess, (state, { todo }) => ({
    ...state,
    added: true,
    adding: false,
    hasError: false,
    todos: [...state.todos, todo]
  }))
);

export function todoReducer(
  state: TodoState | undefined,
  action: Action
): TodoState {
  return reducer(state, action);
}
