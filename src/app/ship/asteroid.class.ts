import {ISpaceObject, SpaceObjectType} from './';

export class Asteroid implements ISpaceObject {
	$key: string;
	type: SpaceObjectType;
	x: number;
	y: number;
	currentScore: number = 0;
	stolenScore: number = 0;
	totalScore: number = 0;
	image: string;
	ownerKey: string;
	size: number;
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.type = SpaceObjectType.Asteroid;
		this.image = 'asteroids-240x240.png';
		this.size = Math.ceil(Math.random() * 10);
	}
}
