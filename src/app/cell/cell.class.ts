import {ICell} from './';

export class Cell implements ICell {
	x: number;
	y: number;
	contents: any;
	planet: any;
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.contents = null;
		this.planet = null;
	}
}
