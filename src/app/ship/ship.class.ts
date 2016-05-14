import {Direction} from '../map';
import {ISpaceObject, SpaceObjectType} from './';

export class Ship implements ISpaceObject {
	$key: string;
	facing: Direction;
	ownerKey: string;
	type: SpaceObjectType;
	x: number;
	y: number;
	currentScore: number = 0;
	stolenScore: number = 0;
	totalScore: number = 0;
	image: string;
	constructor(dir, x, y, ownerKey, image) {
		this.facing = dir;
		this.x = x;
		this.y = y;
		this.type = SpaceObjectType.Ship;
		this.ownerKey = ownerKey;
		this.image = image || 'spaceship14-240x185.png';
	}
}
