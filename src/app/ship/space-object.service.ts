import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {ISpaceObject, Ship, SpaceObjectType} from './';
import {Direction} from '../map';
import {AuthService} from '../shared/auth.service';

@Injectable()
export class SpaceObjectService {

	spaceObjects$: FirebaseListObservable<ISpaceObject[]>;

	constructor(private authService: AuthService, private af: AngularFire) {
		this.spaceObjects$ = this.af.database.list('/space-objects') as FirebaseListObservable<ISpaceObject[]>;
	}

	createShip(): Ship {
		return new Ship(Direction.Coreward, 4, 5, this.authService.id);
	}

	moveShip(ship: Ship) {
		return this.spaceObjects$.update(ship.$key, { facing: ship.facing, x: ship.x, y: ship.y });
	}

	registerObject(obj: ISpaceObject) {
		// return this.spaceObjects$.push(obj);
	}

	registerShip(ship: Ship) {
		if (!ship.$key) {
			return this.spaceObjects$.push(ship);
		}
	}

}
