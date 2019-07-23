import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const myObserverble = Observable.create((observer: Observer<string>) => {
      setTimeout(() => {
        console.log('First package');
      }, 2000);
      setTimeout(() => {
        console.log('Second package');
      }, 4000);
      setTimeout(() => {
        observer.complete();
      }, 5000);
    });

    myObserverble.subscribe(
      (data: string) => {
        console.log(data);
      },
      (error: string) => {
        console.log(error);
      },
      () => {
        console.log('COMPLETED');
      }
    );
  }
}
