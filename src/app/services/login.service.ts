import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoginService {

  // Observable string sources
  private loginEventSource = new Subject<void>();
  private logoutEventSource = new Subject<void>();

  // Observable string streams
  loginEvent$ = this.loginEventSource.asObservable();
  logoutEvent$ = this.logoutEventSource.asObservable();

  constructor() { }

  // Service message commands
  loginEvent() {
    this.loginEventSource.next();
  }

  logoutEvent() {
    this.logoutEventSource.next();
  }

}
