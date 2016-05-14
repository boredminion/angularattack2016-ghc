import {Direction} from '../map';
import {ISpaceObject, SpaceObjectType} from './';

export class Ship implements ISpaceObject {
	$key: string;
	facing: Direction;
	ownerKey: string;
	type: SpaceObjectType;
	x: number;
	y: number;
	constructor(dir, x, y, ownerKey) {
		this.facing = dir;
		this.x = x;
		this.y = y;
		this.type = SpaceObjectType.Ship;
		this.ownerKey = ownerKey;
	}
}
