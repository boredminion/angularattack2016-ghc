import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {ISpaceObject, Planet, Ship, SpaceObjectType} from './';
import {Direction} from '../map';
import {AuthService} from '../shared/auth.service';

@Injectable()
export class SpaceObjectService {

	spaceObjects: ISpaceObject[] = [];
	spaceObjects$: FirebaseListObservable<ISpaceObject[]>;
	PLANET_IMAGES: string[] = [
		'asteroids-240x240.png',
		'callisto-240x240.png',
		'earth30-240x240.png',
		'europa-240x240.png',
		'jupiter5-240x218.png',
		'jupiter6-240x231.png',
		'mars3-240x240.png',
		'mars5-240x236.png',
		'mars6-240x240.png',
		'moon17-240x236.png',
		'moon18.png',
		'neptune4-240x221.png',
		'planet5-240x233.png',
		'planet6.png',
		'planet9-240x223.png',
		'planet10-240x240.png',
		'planet12-240x240.png',
		'planet13-240x238.png',
		'saturn3-240x114.png',
		'saturn5-300x124.png'
	];

	constructor(private authService: AuthService, private af: AngularFire) {
		this.spaceObjects$ = this.af.database.list('/space-objects') as FirebaseListObservable<ISpaceObject[]>;
		this.spaceObjects$.subscribe(objects => {
			this.spaceObjects = objects;
		});
	}

	createShip(): Ship {
		return new Ship(Direction.Coreward, 4, 5, this.authService.id, null);
	}

	createPlanet(x, y, image): void {
		if(!image) {
			image = this.PLANET_IMAGES[Math.floor(Math.random() * this.PLANET_IMAGES.length)];
		}
		this.registerObject(new Planet(x, y, image));
	}

	getShip(ownerKey) {
		return this.spaceObjects.find(spaceObject => {
			return spaceObject.ownerKey === ownerKey;
		});
	}

	registerObject(obj: ISpaceObject) {
		return this.spaceObjects$.push(obj);
	}

	registerShip(ship: Ship) {
		if (!ship.$key) {
			return this.spaceObjects$.push(ship);
		}
	}

}
