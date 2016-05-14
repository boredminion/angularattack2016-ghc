import { Injectable } from '@angular/core';
import {Observable, Observer} from 'rxjs/Rx';
import {ISpaceObject, Ship, SpaceObjectService} from '../ship';
import {Direction} from './';
import {Cell} from '../cell';

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

	constructor(private spaceObjectService: SpaceObjectService) {
		this.grid$ = new Observable(observer => this.gridObserver = observer).share() as Observable<Cell[][]>;
		spaceObjectService.spaceObjects$.subscribe(objects => {
			this.spaceObjects = objects;
			this.populateGrid()
		});
		spaceObjectService.myShip$.subscribe(ships => {
			if (ships.length) {
				this.ship = ships[0];
			} else {
				this.ship = spaceObjectService.createShip();
			}
			spaceObjectService.registerShip(this.ship);
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
			if (this.ship.x === this.x) {
				this.ship.x = 0;
			}
			if (this.ship.x < 0) {
				this.ship.x = this.x - 1;
			}
			if (this.ship.y === this.y) {
				this.ship.y = 0;
			}
			if (this.ship.y < 0) {
				this.ship.y = this.y - 1;
			}

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
		for (let i = 0; i < this.x; i++) {
			this.grid[i] = [];
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
			this.grid[obj.x][obj.y].contents = obj;
		}
	}

}
