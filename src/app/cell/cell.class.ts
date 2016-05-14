import {ICell} from './';

export class Cell implements ICell {
	x: number;
	y: number;
	contents: any;
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}
