import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import {Inject, Injectable} from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseRef} from 'angularfire2';
import {AuthService} from './';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

export interface IUser {
  $key?: string;
  displayName: string;
  online: any;
}

export class User implements IUser {
  displayName: string;
  online: any;

  constructor(displayName: string) { this.displayName = displayName; }
}

@Injectable()
export class UserService {
  public online: FirebaseListObservable<any>;
  public connected: FirebaseObjectObservable<any>;
  public users: IUser[];
  public currentUser: FirebaseObjectObservable<IUser>;
  private af: AngularFire;
  private auth: AuthService;
  private onlineRef: Firebase;
  private onlineItemRef: Firebase;

  constructor(af: AngularFire, auth: AuthService, @Inject(FirebaseRef) ref: Firebase) {
    this.af = af;
    af.database.list(`/users`).subscribe(
      data => {
        this.users = data;
      },
      err => console.log(err),
      () => console.log('done')
    );
    this.auth = auth;
    this.currentUser = this.af.database.object(`/users/` + this.auth.id);
    this.online = af.database.list('/users/' + this.auth.id + '/online');
    this.onlineRef = ref.child(`/users/` + this.auth.id + `/online`);

    const connectedRef = ref.child('/.info/connected');

    this.connected = this.af.database.object(`/.info/connected`);
    this.connected.subscribe(data => {
      if (data === true) {
        this.setOnline();
      }
    }, err => console.error(err), () => console.log('done'));
  }

  setOnline() {
    this.onlineItemRef = this.onlineRef.child('1');
    this.onlineItemRef.onDisconnect().remove();
    this.onlineItemRef.set(true);
  }
  
  setOffline() {
    this.onlineItemRef.remove();
  }
  
  getUser(uid: string) {
    return this.af.database.object(`/users/`+ uid);
  }
  
  getDisplayName(uid: string) {
    let user = this.users.find((user) => {
      return user.$key === uid;
    }); 
    return user ? user.displayName : null;
  }
  
  setDisplayName(newDisplayName: string) {
    let currentUser: User = new User(newDisplayName);
    this.af.database.object(`/users/` + this.auth.id).set(currentUser);
  }
}
