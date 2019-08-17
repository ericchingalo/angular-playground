import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  constructor() {}
  public unsubcribeComponents$ = new Subject<void>();
  public unsubscribe$ = this.unsubcribeComponents$.asObservable();
}
