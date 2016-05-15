import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {ISpaceObject, Explosion, Planet, SpaceObjectType} from './';
import {Direction} from '../map';
import {AuthService, User} from '../shared';

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
	boomDuration: number = 2000;

	constructor(private authService: AuthService, private af: AngularFire) {
		this.spaceObjects$ = this.af.database.list('/space-objects') as FirebaseListObservable<ISpaceObject[]>;
		this.spaceObjects$.subscribe(objects => {
			this.spaceObjects = objects;
		});
	}

	createPlanet(x, y, image): void {
		if (!image) {
			image = this.PLANET_IMAGES[Math.floor(Math.random() * this.PLANET_IMAGES.length)];
		}
		this.registerObject(new Planet(x, y, image));
	}

	createBoom(x, y, hit): void {
		let image = 'fireworks6-150x150.png';
		if (hit) {
			image = 'explosion5-150x150.png';
		}
		this.registerObject(new Explosion(x, y, image)).then((boom: any) => {
			setTimeout(() => {
				this.spaceObjects$.remove(boom.path.u[1]);
			}, this.boomDuration);
		}) as any;
	}

	registerObject(obj: ISpaceObject) {
		return this.spaceObjects$.push(obj);
	}

	registerShip(ship: User) {
		if (!ship.$key) {
			return this.spaceObjects$.push(ship);
		}
	}

}
