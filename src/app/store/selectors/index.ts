import { Todo } from 'src/app/models/todo.model';
import { createSelector } from '@ngrx/store';

export interface AppState {
  todos: Todo;
}

export const selectTodos = (appState: AppState) => {
  return appState.todos;
};

export const selectAllTodos = createSelector(
  selectTodos,
  todos => {
    return todos;
  }
);
