import { Injectable } from '@angular/core';
import {Subject}    from 'rxjs/Subject';

export interface INotification {
  title: string;
  message: string;
  type: string;
  seen: boolean;
}

export class Notification implements INotification {
	title: string;
  message: string;
  type: string;
  seen: boolean = false;
	constructor(type: string, title: string, message: string) {
    this.type = type;
    this.title = title;
    this.message = message;
  }
}

@Injectable()
export class NotificationsService {
  private _notification = new Subject<Notification>();
	notification$ = this._notification.asObservable();

  constructor() {
  }
  
  pop(type: string, title: string, message: string) {
    this._notification.next(new Notification(type, title, message));
  }

}
