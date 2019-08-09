import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { Todo } from 'src/app/models/todo.model';
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // private todos: Todo[] = [{ id: 1, text: 'TestTodo', completed: false }];
  // private todos: Todo[] = [];
  // getAllTodos(): Todo[] {
  //   return this.todos;
  // }
  // addTodos(todo: Todo): Todo[] {
  //   this.todos = [...this.todos, todo];
  //   return this.todos;
  // }
  // completeTodo(completedTodo: Todo): any {
  //   const markedTodos = _.remove(this.todos, todo => {
  //     return todo === completedTodo;
  //   });
  //   return { todos: this.todos, completed: markedTodos };
  // }
  // getNewId(): number {
  //   return this.todos.length + 1;
  // }
  constructor(private readonly angularFirestore: AngularFirestore) {}

  get model(): string {
    return 'todos';
  }

  findAll(): Observable<Todo[]> {
    return this.angularFirestore
      .collection<Todo>(this.model)
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(action => {
            return { ...action.payload.doc.data(), id: action.payload.doc.id };
          })
        )
      );
  }
  findById(id: string) {
    return this.angularFirestore
      .collection<Todo>(this.model)
      .doc<Todo>(id)
      .valueChanges()
      .pipe(
        take(1),
        map((content: any) => {
          return { ...content, id };
        })
      );
  }

  create(content: Todo) {
    // return this.angularFirestore.collection<Todo>(this.model).add(content);
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
        .collection('todos')
        .add(content)
        .then(res => {}, err => reject(err));
    });
  }

  update(id: string, content: Todo) {
    return this.angularFirestore
      .collection<Todo>(this.model)
      .doc(id)
      .update(content);
  }

  delete(id: string) {
    return this.angularFirestore
      .collection<Todo>(this.model)
      .doc(id)
      .delete();
  }
}
