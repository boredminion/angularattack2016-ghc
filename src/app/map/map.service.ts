import { Injectable } from '@angular/core';
import {Observable, Observer} from 'rxjs/Rx';
import {Subject}    from 'rxjs/Subject';
import {ISpaceObject, Ship, SpaceObjectService, SpaceObjectType} from '../ship';
import {Direction} from './';
import {Cell} from '../cell';
import {AuthService} from '../shared/auth.service';

export interface IAction {
	label: string;
	action: any;
	active: boolean;
	time: any;
}

export class Action implements IAction {
	label: string;
	action: any;
	active: boolean = true;
	time: any;

	constructor(label: string, action: any) {
		this.label = label;
		this.action = action;
		this.time = 2;
		let interval = setInterval(() => {
			if (this.time > 0) {
				this.time--;
			}
			if (this.active === false) {
				clearInterval(interval);
			}
			if (this.time === 0 && this.active === true) {
				this.time = '';
				this.action();
				this.label = '';
				this.active = false;
				clearInterval(interval);
			}
		}, 1000);
	}
}

@Injectable()
export class MapService {

	// map$
	x: number = 9; //height of grid
	y: number = 11; //width of grid
	extent: number = 100; //max dimension of the map
	maxPlanets: number = 100;


	ship: Ship;
	grid$: Observable<Cell[][]>;
	gridObserver: Observer<Cell[][]>;
	spaceObjects: ISpaceObject[] = [];
	private _nextActionSource = new Subject<Action>();
	nextAction$ = this._nextActionSource.asObservable();
	currentAction: Action;

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
		this.nextAction$.subscribe(action => {
			this.currentAction = action;
		});
	}

	pewPew(x, y) {
		this.spaceObjects.forEach(function(spaceObject) {
			if (spaceObject.x === x && spaceObject.y === y && spaceObject.$key !== this.ship.$key) {
				this.ship.currentScore++;
				this.ship.totalScore++;
				spaceObject.currentScore = spaceObject.currentScore > 0 ? spaceObject.currentScore - 1 : 0;
				spaceObject.stolenScore = spaceObject.stolenScore ? spaceObject.stolenScore + 1 : 1;
				this.spaceObjectService.scoreShip(this.ship);
				this.spaceObjectService.scoreShip(spaceObject);
			}
		}.bind(this));
	}

	collisionCheck(x, y) {
		let collide = false;
		this.spaceObjects.forEach(function(spaceObject) {
			if (spaceObject.x === x && spaceObject.y === y && spaceObject.$key !== this.ship.$key && spaceObject.type === 0) {
				collide = true;
			}
		}.bind(this));
		return collide;
	}

	forwardCell() {
		switch (this.ship.facing) {
			case 0:
				return [(this.ship.x - 1), (this.ship.y)];
			case 1:
				return [(this.ship.x), (this.ship.y + 1)];
			case 2:
				return [(this.ship.x + 1), (this.ship.y)];
			case 3:
				return [(this.ship.x), (this.ship.y - 1)];
		}
	}

	moveForward() {
		let move = this.forwardCell();
		if (this.collisionCheck(move[0], move[1])) {
			console.log("can't move there");
		} else {
			this.ship.x = move[0];
			this.ship.y = move[1];
			this.ship.x = this.wraparound(this.ship.x, this.extent);
			this.ship.y = this.wraparound(this.ship.y, this.extent);
			this.populateGrid();
		}
		this.spaceObjectService.moveShip(this.ship);
	}

	rotateRight() {
		if (this.ship.facing < 3) {
			this.ship.facing++;
		} else {
			this.ship.facing = 0;
		}
		this.spaceObjectService.moveShip(this.ship);
	}

	rotateLeft() {
		if (this.ship.facing) {
			this.ship.facing--;
		} else {
			this.ship.facing = 3;
		}
		this.spaceObjectService.moveShip(this.ship);
	}

	fireWeapon() {
		console.log("pew pew");
		switch (this.ship.facing) {
			case 0:
				this.pewPew((this.ship.x - 1), (this.ship.y));
				break;
			case 1:
				this.pewPew((this.ship.x), (this.ship.y + 1));
				break;
			case 2:
				this.pewPew((this.ship.x + 1), (this.ship.y));
				break;
			case 3:
				this.pewPew((this.ship.x), (this.ship.y - 1));
				break;
		}
	}

	actionMoveForward() {
		if (this.currentAction) {
			if (this.currentAction.label !== 'Move Forward') {
				this.currentAction.active = false;
			}
		}
		if (!this.currentAction || (this.currentAction && this.currentAction.label !== 'Move Forward')) {
			this._nextActionSource.next(new Action('Move Forward', this.moveForward.bind(this)));
		}
	}

	actionRotateLeft() {
		if (this.currentAction) {
			if (this.currentAction.label !== 'Rotate Left') {
				this.currentAction.active = false;
			}
		}
		if (!this.currentAction || (this.currentAction && this.currentAction.label !== 'Rotate Left')) {
			this._nextActionSource.next(new Action('Rotate Left', this.rotateLeft.bind(this)));
		}
	}

	actionRotateRight() {
		if (this.currentAction) {
			if (this.currentAction.label !== 'Rotate Right') {
				this.currentAction.active = false;
			}
		}
		if (!this.currentAction || (this.currentAction && this.currentAction.label !== 'Rotate Right')) {
			this._nextActionSource.next(new Action('Rotate Right', this.rotateRight.bind(this)));
		}
	}

	actionFireWeapon() {
		if (this.currentAction) {
			if (this.currentAction.label !== 'Fire') {
				this.currentAction.active = false;
			}
		}
		if (!this.currentAction || (this.currentAction && this.currentAction.label !== 'Fire')) {
			this._nextActionSource.next(new Action('Fire', this.fireWeapon.bind(this)));
		}
	}

	keyAction(event: KeyboardEvent) {
		if (event.keyCode === 32) {
			this.actionFireWeapon();
		}
		if (event.keyCode === 38 || event.keyCode === 87) {
			this.actionMoveForward();
		}
		if (event.keyCode === 36 || event.keyCode === 81) {
			this.actionRotateLeft();
		}
		if (event.keyCode === 33 || event.keyCode === 69) {
			this.actionRotateRight();
		}
	}

	populateGrid() {
		let visibleGrid = [];
		let fullGrid = [];
		for (let i = 0; i < this.extent; i++) {
			fullGrid.push([]);
		}
		for (let i = 0; i < this.x; i++) {
			visibleGrid.push([]);
		}
		for (let i = 0; i < this.extent; i++) {
			for (let j = 0; j < this.extent; j++) {
				fullGrid[i][j] = new Cell(i, j);
			}
		}
		fullGrid = this.addObjects(fullGrid);
		let visibleX = this.ship.x + 1 - Math.floor(this.x / 2);
		let visibleY = this.ship.y + 1 - Math.floor(this.y / 2);
		for (let i = 0; i < this.x; i++) {
			for (let j = 0; j < this.x; j++) {
				let gridX = this.wraparound(i + visibleX, this.extent);
				let gridY = this.wraparound(j + visibleY, this.extent);
				visibleGrid[i][j] = fullGrid[gridX][gridY];
			}
		}
		this.gridObserver.next(visibleGrid);
	}

	addObjects(grid) {
		let planetCount = 0;
		for (let i = 0; i < this.spaceObjects.length; i++) {
			let obj = this.spaceObjects[i];
			grid[obj.x][obj.y].contents = obj;
			if(obj.type === SpaceObjectType.Planet) {
				planetCount++;
			}
		}
		if(planetCount < this.maxPlanets) {
			let planetX = Math.floor(Math.random() * this.extent);
			let planetY = Math.floor(Math.random() * this.extent);
			if(!grid[planetX][planetY].contents) {
				this.spaceObjectService.createPlanet(planetX, planetY, null);
			}
		}
		return grid;
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
