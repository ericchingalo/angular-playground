import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './models/todo.model';
import { selectAllTodos } from './store/selectors';
import { Store, select } from '@ngrx/store';
import { addTodoSuccess } from './store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
