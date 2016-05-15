import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import {Inject, Injectable} from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseRef} from 'angularfire2';
import {AuthService, IUser, User} from './';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {Direction} from '../map';
import {Upgrade, UpgradeType} from '../ship';
import {GlobalService} from './global.service';

@Injectable()
export class UserService {
  public online: FirebaseListObservable<any>;
  public connected: FirebaseObjectObservable<any>;
  public users: IUser[] = [];
  public users$: FirebaseListObservable<IUser[]>;
  public currentUser: FirebaseObjectObservable<IUser>;
  private ship: User;
  private upgrades$: FirebaseListObservable<Upgrade[]>;
  private af: AngularFire;
  private auth: AuthService;
  private onlineRef: Firebase;
  private onlineItemRef: Firebase;

  constructor(private globalService: GlobalService, af: AngularFire, auth: AuthService, @Inject(FirebaseRef) ref: Firebase) {
    this.af = af;
    this.users$ = af.database.list(`/users`);
    this.users$.subscribe(
        data => { this.users = data; }, err => console.log(err), () => console.log('done'));
    this.auth = auth;
    this.currentUser = this.af.database.object(`/users/` + this.auth.id);
    this.upgrades$ = this.af.database.list(`/users/` + this.auth.id + `/upgrades`);
    this.currentUser.subscribe(user => {
      this.ship = user;
    });
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
    return this.currentUser.update({
      facing: ship.facing,
      lastX: this.ship.x,
      lastY: this.ship.y,
      x: ship.x,
      y: ship.y
    });
	}
  
  scoreOwnShip(ship: User) {
		return this.currentUser.update({
			currentScore: ship.currentScore ? ship.currentScore : 0,
			stolenScore: ship.stolenScore ? ship.stolenScore : 0,
			totalScore: ship.totalScore ? ship.totalScore : 0
		});
	}

	scoreShip(ship: User) {
    let newX = Math.floor(Math.random() * this.globalService.globalSettings.mapExtent);
    let newY = Math.floor(Math.random() * this.globalService.globalSettings.mapExtent);
    let randomLocation = false;
    while(this.users.filter(user => {
      return user.x === newX && user.y === newY;
    }).length > 0) {
      newX = Math.floor(Math.random() * this.globalService.globalSettings.mapExtent);
      newY = Math.floor(Math.random() * this.globalService.globalSettings.mapExtent);
    }
    if (ship.health <= 0) {
      return this.users$.update(ship.$key, {
        facing: ship.facing,
        lastX: ship.x,
        lastY: ship.y,
        x: newX,
        y: newY,
        currentScore: ship.currentScore ? ship.currentScore : 0,
        stolenScore: ship.stolenScore ? ship.stolenScore : 0,
        totalScore: ship.totalScore ? ship.totalScore : 0,
        health: this.globalService.globalSettings.baseShipHealth,
        upgrades: []
      });
    } else {
      return this.users$.update(ship.$key, {
        currentScore: ship.currentScore ? ship.currentScore : 0,
        stolenScore: ship.stolenScore ? ship.stolenScore : 0,
        totalScore: ship.totalScore ? ship.totalScore : 0,
        health: ship.health ? ship.health : this.globalService.globalSettings.baseShipHealth
      });
    }
	}
  
  buyUpgrade(upgrade: Upgrade) {
    this.upgrades$.push(upgrade.$key);
    this.currentUser.update({
      currentScore: this.ship.currentScore - upgrade.cost,
      health: upgrade.type === UpgradeType.Armor ? this.ship.health += upgrade.value : this.ship.health
    });
  }

  setShipName(newShipName: string, image: string, x: number, y: number, facing: Direction) {
    let currentUser: User = new User(newShipName || this.auth.username, image || 'spaceship14-240x185.png');
    let newX = Math.floor(Math.random() * this.globalService.globalSettings.mapExtent);
    let newY = Math.floor(Math.random() * this.globalService.globalSettings.mapExtent);
    let randomLocation = false;
    while(this.users.filter(user => {
      return user.x === newX && user.y === newY;
    }).length > 0) {
      newX = Math.floor(Math.random() * this.globalService.globalSettings.mapExtent);
      newY = Math.floor(Math.random() * this.globalService.globalSettings.mapExtent);
    }
    if (x === null && y === null) {
      currentUser.x = newX;
      currentUser.y = newY;
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
