import { Injectable } from '@angular/core';
import {Observable, Observer} from 'rxjs/Rx';
import {Subject}    from 'rxjs/Subject';
import {ISpaceObject, Ship, SpaceObjectService, SpaceObjectType} from '../ship';
import {Direction} from './';
import {Cell} from '../cell';
import {AuthService, UserService} from '../shared';
import {User} from '../shared';

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


	ship: User;
	ships: User[] = [];
	grid$: Observable<Cell[][]>;
	gridObserver: Observer<Cell[][]>;
	spaceObjects: ISpaceObject[] = [];
	private _nextActionSource = new Subject<Action>();
	nextAction$ = this._nextActionSource.asObservable();
	currentAction: Action;
	transitions$: Observable<string>;
	transitionsObserver: Observer<string>;


	constructor(private userService: UserService, authService: AuthService, private spaceObjectService: SpaceObjectService) {
		this.grid$ = new Observable(observer => this.gridObserver = observer).share() as Observable<Cell[][]>;
		this.transitions$ = new Observable(observer => this.transitionsObserver = observer).share() as Observable<string>;
		userService.users$.subscribe(ships => {
			this.ships = ships;
			this.populateGrid();
		});
		userService.currentUser.subscribe(ship => {
			this.ship = ship;
		});
		spaceObjectService.spaceObjects$.subscribe(objects => {
			this.spaceObjects = objects;
			this.populateGrid();
		});
		this.nextAction$.subscribe(action => {
			this.currentAction = action;
		});
	}

	doAnimations(facing) {
		let animation;
		switch(facing) {
			case Direction.Coreward:
				animation = 'coreward';
				break;
			case Direction.Trailing:
				animation = 'trailing';
				break;
			case Direction.Rimward:
				animation = 'rimward';
				break;
			case Direction.Spinward:
				animation = 'spinward';
				break;
		}
		this.transitionsObserver.next(animation);
		setTimeout(() => this.transitionsObserver.next(null), 1000);
	}

	pewPew(x, y) {
		this.ships.forEach(function(ship) {
			if (ship.x === x && ship.y === y) {
				this.ship.currentScore++;
				this.ship.totalScore++;
				ship.currentScore = ship.currentScore > 0 ? ship.currentScore - 1 : 0;
				ship.stolenScore = ship.stolenScore ? ship.stolenScore + 1 : 1;
				this.userService.scoreOwnShip(this.ship);
				this.userService.scoreShip(ship);
			}
		}.bind(this));
	}

	collisionCheck(x, y) {
		let collide = false;
		this.ships.forEach(function(ship) {
			if (ship.x === x && ship.y === y && ship.$key !== this.ship.$key) {
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
			return;
		}
		this.ship.x = move[0];
		this.ship.y = move[1];
		this.ship.x = this.wraparound(this.ship.x, this.extent);
		this.ship.y = this.wraparound(this.ship.y, this.extent);
		this.populateGrid();
		this.doAnimations(this.ship.facing);
		this.userService.moveShip(this.ship);
	}

	rotateRight() {
		let oldFacing = this.ship.facing;
		if (this.ship.facing < 3) {
			this.ship.facing++;
		} else {
			this.ship.facing = 0;
		}
		// this.transitionsObserver.next('facing-' + oldFacing);
		// setTimeout(() => this.transitionsObserver.next(null), 1000);
		this.userService.moveShip(this.ship);
	}

	rotateLeft() {
		let oldFacing = this.ship.facing;
		if (this.ship.facing) {
			this.ship.facing--;
		} else {
			this.ship.facing = 3;
		}
		// this.transitionsObserver.next('facing-' + oldFacing);
		// setTimeout(() => this.transitionsObserver.next(null), 1000);
		this.userService.moveShip(this.ship);
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
		this.spaceObjects.forEach(spaceObject => {
			grid[spaceObject.x][spaceObject.y].planet = spaceObject;
			if(spaceObject.type === SpaceObjectType.Planet) {
				planetCount++;
			}
		});
		this.ships.forEach(ship => {
			let shipKeys = Object.keys(ship);
			if (shipKeys.indexOf('x') > -1 && shipKeys.indexOf('y') > -1) {
				grid[ship.x][ship.y].contents = ship;
			}
		});
		if(planetCount < this.maxPlanets) {
			let planetX = Math.floor(Math.random() * this.extent);
			let planetY = Math.floor(Math.random() * this.extent);
			if(!grid[planetX][planetY].planet) {
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
