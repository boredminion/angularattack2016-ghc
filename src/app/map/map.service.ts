import { Injectable } from '@angular/core';
import {Observable, Observer} from 'rxjs/Rx';
import {ISpaceObject, Ship, SpaceObjectService} from '../ship';
import {Direction} from './';
import {Cell} from '../cell';
import {AuthService} from '../shared/auth.service';

@Injectable()
export class MapService {

	// map$
	x: number = 9; //height of grid
	y: number = 11; //width of grid
	ship: Ship;
	grid$: Observable<Cell[][]>;
	gridObserver: Observer<Cell[][]>;
	grid: Cell[][] = [];
	spaceObjects: ISpaceObject[] = [];

	constructor(authService: AuthService, private spaceObjectService: SpaceObjectService) {
		this.grid$ = new Observable(observer => this.gridObserver = observer).share() as Observable<Cell[][]>;
		spaceObjectService.spaceObjects$.subscribe(objects => {
			for (let o = 0; o < objects.length; o++) {
				let object = objects[o] as Ship;
				if (object.ownerKey === authService.id) {
					this.ship = object;
				}
			}
			if (!this.ship) {
				this.ship = spaceObjectService.createShip();
				spaceObjectService.registerShip(this.ship);
			}
			this.spaceObjects = objects;
			this.populateGrid();
		});
	}

	keyAction(event: KeyboardEvent) {
		console.log(event.keyCode);
		if (event.keyCode === 38 || event.keyCode === 87) {
			switch (this.ship.facing) {
				case 0:
					this.ship.x--;
					break;
				case 1:
					this.ship.y++;
					break;
				case 2:
					this.ship.x++;
					break;
				case 3:
					this.ship.y--;
					break;
			}
			this.ship.x = this.wraparound(this.ship.x, this.x);
			this.ship.y = this.wraparound(this.ship.y, this.y);

			this.populateGrid();
		}
		if (event.keyCode === 36 || event.keyCode === 81) {
			if (this.ship.facing) {
				this.ship.facing--;
			} else {
				this.ship.facing = 3;
			}
		}
		if (event.keyCode === 33 || event.keyCode === 69) {
			if (this.ship.facing < 3) {
				this.ship.facing++;
			} else {
				this.ship.facing = 0;
			}
		}
		this.spaceObjectService.moveShip(this.ship);
	}

	populateGrid() {
		this.grid = [[], [], [], [], [], [], [], [], []];
		for (let i = 0; i < this.x; i++) {
			for (let j = 0; j < this.y; j++) {
				this.grid[i][j] = new Cell(i, j);
			}
		}
		this.addObjects();
		this.gridObserver.next(this.grid);
	}

	addObjects() {
		for (let i = 0; i < this.spaceObjects.length; i++) {
			let obj = this.spaceObjects[i];
			let x = this.centerOfTheUniverse(obj.x, this.ship.x, this.x);
			let y = this.centerOfTheUniverse(obj.y, this.ship.y, this.y);
			this.grid[x][y].contents = obj;
		}
	}

	centerOfTheUniverse(value, offset, limit) {
		return this.wraparound(value - offset - Math.ceil(limit / 2), limit);
	}

	wraparound(value, limit) {
		if (value >= limit) {
			return this.wraparound(value - limit, limit);
		}
		if (value < 0) {
			return this.wraparound(limit + value, limit);
		}
		return value;
	}

}
