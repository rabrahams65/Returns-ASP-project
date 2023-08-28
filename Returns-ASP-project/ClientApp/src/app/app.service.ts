import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private message = new BehaviorSubject('Initial Message');
  getMessage = this.message.asObservable();
  
  private toast = new Subject<boolean>()
  getToast = this.toast.asObservable();

  constructor() { }

  setMessage(message: string) {
    this.message.next(message);
  }

  showToast(status: boolean) {
    this.toast.next(status)
  }



 

}
