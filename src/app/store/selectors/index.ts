import { Todo } from 'src/app/models/todo.model';
import { createSelector, createFeatureSelector } from '@ngrx/store';

// import * as fromTodos from '../reducers/todo.reducers';
import {
  TodoState,
  selectAllTodos,
  getSelectedTodoId,
  todosCount
} from '../reducers/todo.reducers';
export interface AppState {
  todos: TodoState;
}

export const selectTodoState = createFeatureSelector<TodoState>('todos');

export const selectAllTodoList = createSelector(
  selectTodoState,
  selectAllTodos
);

export const selectCurrentTodoId = createSelector(
  selectTodoState,
  getSelectedTodoId
);

export const currentTodoCount = createSelector(
  selectTodoState,
  todosCount
);
