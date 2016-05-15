import {ISpaceObject, SpaceObjectType} from './';

export class Explosion implements ISpaceObject {
	$key: string;
	type: SpaceObjectType;
	x: number;
	y: number;
	currentScore: number = 0;
	stolenScore: number = 0;
	totalScore: number = 0;
	image: string;
	ownerKey: string;
	time: number;
	constructor(x, y, image) {
		this.x = x;
		this.y = y;
		this.type = SpaceObjectType.Explosion;
		this.image = image;
		this.time = Date.now();
	}
}
