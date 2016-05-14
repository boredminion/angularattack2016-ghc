import {Direction} from '../map';
import {IShip} from './';

export class Ship implements IShip {
	facing: Direction;
	x: number;
	y: number;
	constructor(dir, x, y) { this.facing = dir; this.x = x; this.y = y; }
}
