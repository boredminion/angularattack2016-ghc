import {ISpaceObject, SpaceObjectType} from './';

export class AIShip implements ISpaceObject {
	$key: string;
	type: SpaceObjectType = SpaceObjectType.AIShip;
	x: number;
	y: number;
	currentScore: number = 0;
	stolenScore: number = 0;
	totalScore: number = 0;
	image: string;
	ownerKey: string;
	time: number;
	health: number = 50;
	weaponRange: number = 0;
	weaponDamage: number = 0;
	isControlled: boolean = false;
	facing: number = 0;
	constructor(x, y, image) {
		this.x = x;
		this.y = y;
		this.image = image;
	}
}
