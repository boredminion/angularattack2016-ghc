import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import {Inject, Injectable} from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseRef} from 'angularfire2';
import {AuthService} from './';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {Direction} from '../map';
import {IUser, User} from './index';

@Injectable()
export class UserService {
  public online: FirebaseListObservable<any>;
  public connected: FirebaseObjectObservable<any>;
  public users: IUser[] = [];
  public users$: FirebaseListObservable<IUser[]>;
  public currentUser: FirebaseObjectObservable<IUser>;
  private af: AngularFire;
  private auth: AuthService;
  private onlineRef: Firebase;
  private onlineItemRef: Firebase;

  constructor(af: AngularFire, auth: AuthService, @Inject(FirebaseRef) ref: Firebase) {
    this.af = af;
    this.users$ = af.database.list(`/users`);
    this.users$.subscribe(
        data => { this.users = data; }, err => console.log(err), () => console.log('done'));
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

  setOffline() { this.onlineItemRef.remove(); }

  getUser(uid: string) { return this.af.database.object(`/users/` + uid); }
  
  getUsers() {
    return 
  }

  getShipName(uid: string) {
    let user = this.users.find((user) => { return user.$key === uid; });
    return user ? user.shipName : null;
  }
  
  moveShip(ship: User) {
    return this.currentUser.update({ facing: ship.facing, x: ship.x, y: ship.y });
	}
  
  scoreOwnShip(ship: User) {
		return this.currentUser.update({
			currentScore: ship.currentScore ? ship.currentScore : 0,
			stolenScore: ship.stolenScore ? ship.stolenScore : 0,
			totalScore: ship.totalScore ? ship.totalScore : 0
		});
	}

	scoreShip(ship: User) {
		return this.users$.update(ship.$key, {
			currentScore: ship.currentScore ? ship.currentScore : 0,
			stolenScore: ship.stolenScore ? ship.stolenScore : 0,
			totalScore: ship.totalScore ? ship.totalScore : 0
		});
	}

  setShipName(newShipName: string, image: string, x: number, y: number, facing: Direction) {
    let currentUser: User = new User(newShipName || this.auth.username, image || 'spaceship14-240x185.png');
    if (x === null && y === null) {
      currentUser.x = 0;
      currentUser.y = 0;
    } else {
      currentUser.x = x;
      currentUser.y = y;
    }
    if (facing === null) {
      currentUser.facing = 0;
    } else {
      currentUser.facing = facing;
    }
    this.af.database.object(`/users/` + this.auth.id).set(currentUser);
    window.location.replace('/map');
  }
}
