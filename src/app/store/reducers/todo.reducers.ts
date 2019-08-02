import { Todo } from 'src/app/models/todo.model';
import { createReducer, on, Action, State } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as TodoActions from '../actions/todo.actions';

export interface TodoState extends EntityState<Todo> {
  adding: boolean;
  added: boolean;
  loading: boolean;
  loaded: boolean;
  completing: boolean;
  hasError: boolean;
  selectedTodoId: number | null;
}

export function sortByName(todo1: Todo, todo2: Todo): number {
  return todo1.text.localeCompare(todo2.text);
}

export function selectTodoId(todo: Todo): number {
  return todo.id;
}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>({
  sortComparer: sortByName,
  selectId: selectTodoId
});

export const {
  selectIds: selectTodoIds,
  selectEntities: selectTodoEntities,
  selectAll: selectAllTodos,
  selectTotal: todosCount
} = adapter.getSelectors();

export const initialState: TodoState = adapter.getInitialState({
  adding: false,
  added: false,
  loading: false,
  loaded: false,
  completing: false,
  hasError: false,
  selectedTodoId: null
});

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
  on(TodoActions.addTodoSuccess, (state, { todo }) =>
    adapter.addOne(todo, {
      ...state,
      added: true,
      adding: false,
      hasError: false
    })
  ),
  on(TodoActions.loadTodo, state => ({
    ...state,
    loading: true,
    loaded: false,
    hasError: false,
    added: false,
    adding: false
  })),
  on(TodoActions.loadTodoFail, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    hasError: true,
    added: false,
    adding: false
  })),
  on(TodoActions.loadTodoSuccess, (state, { todo }) =>
    adapter.addOne(todo, {
      ...state,
      loading: false,
      loaded: true,
      hasError: false,
      added: false,
      adding: false
    })
  ),
  on(TodoActions.completeTodo, (state, { todo }) => ({
    ...state,
    completing: false,
    loaded: false,
    added: false,
    hasError: false
  })),
  on(TodoActions.completeTodoFail, (state, { error }) => ({
    ...state,
    completing: false,
    hasError: true
  })),
  on(TodoActions.completeTodoSuccess, (state, { todo }) =>
    adapter.updateOne(todo, {
      ...state,
      completing: false
    })
  )
);

export function todoReducer(
  state: TodoState | undefined,
  action: Action
): TodoState {
  return reducer(state, action);
}

export const getSelectedTodoId = (state: TodoState) => state.selectedTodoId;
