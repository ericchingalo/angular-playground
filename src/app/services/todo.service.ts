import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { Todo } from 'src/app/models/todo.model';
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // private todos: Todo[] = [{ id: 1, text: 'TestTodo', completed: false }];
  private todos: Todo[] = [];

  getAllTodos(): Todo[] {
    return this.todos;
  }

  addTodos(todo: Todo): Todo[] {
    this.todos = [...this.todos, todo];
    return this.todos;
  }

  completeTodo(completedTodo: Todo): any {
    const markedTodos = _.remove(this.todos, todo => {
      return todo === completedTodo;
    });

    return { todos: this.todos, completed: markedTodos };
  }

  getNewId(): number {
    return this.todos.length + 1;
  }
}
