import { Injectable } from '@angular/core';
import {Observable, Observer} from 'rxjs/Rx';
import {Subject}    from 'rxjs/Subject';
import {ISpaceObject, SpaceObjectService, SpaceObjectType, AIShip} from '../ship';
import {Direction} from './';
import {Cell} from '../cell';
import {UserService, User, GlobalService, Settings} from '../shared';

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

	constructor(label: string, action: any, time: number) {
		this.label = label;
		this.action = action;
		this.time = time;
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

	tradeMission: any;

	settings: Settings = new Settings();
	ship: User;
	ships: User[] = [];
	aiShips: AIShip[] = [];
	grid$: Observable<Cell[][]>;
	fullGrid: Cell[][] = [];
	visibleGrid: Cell[][] = [];
	gridObserver: Observer<Cell[][]>;
	spaceObjects: ISpaceObject[] = [];
	private _nextActionSource = new Subject<Action>();
	nextAction$ = this._nextActionSource.asObservable();
	currentAction: Action;
	transitions$: Observable<string>;
	transitionsObserver: Observer<string>;


	constructor(
		private userService: UserService,
		private spaceObjectService: SpaceObjectService,
		private globalService: GlobalService) {

		this.grid$ = new Observable(observer => this.gridObserver = observer).share() as Observable<Cell[][]>;
		this.grid$.subscribe(grid => {
			this.visibleGrid = grid;
		});
		this.transitions$ = new Observable(observer => this.transitionsObserver = observer).share() as Observable<string>;

		globalService.globalSettings$.subscribe(function(settings) {
			this.settings = settings;
			for (let i = 0; i < this.settings.mapX; i++) {
				this.visibleGrid.push([]);
			}
			for (let i = 0; i < this.settings.mapExtent; i++) {
				this.fullGrid.push([]);
				for (let j = 0; j < this.settings.mapExtent; j++) {
					this.fullGrid[i][j] = new Cell(i, j);
				}
			}

			this.userService.users$.subscribe(ships => {
				this.ships = ships;
				this.populateGrid();
			});
			this.userService.currentUser.subscribe(ship => {
				this.ship = ship;
			});
			this.spaceObjectService.spaceObjects$.subscribe(objects => {
				this.spaceObjects = objects;
				this.fullGrid.forEach(row => row.forEach(cell => cell.planet = undefined));
				this.aiShips = [];
				this.spaceObjects.forEach(spaceObject => {
					if (spaceObject.type === SpaceObjectType.AIShip) {
						this.aiShips.push(spaceObject);
					}
					if (spaceObject.x) {
						this.fullGrid[spaceObject.x][spaceObject.y].planet = spaceObject;
					} else {
						console.log(spaceObject);
						spaceObjectService.spaceObjects$.remove(spaceObject.$key);
					}
					if (spaceObject.type === SpaceObjectType.Explosion && spaceObject.time && Date.now() - spaceObject.time > 1000) {
						setTimeout(() => {
							spaceObjectService.spaceObjects$.remove(spaceObject.$key);
						}, 1000)
					}
				});
			});
		}.bind(this));

		this.nextAction$.subscribe(action => {
			this.currentAction = action;
		});

		setInterval(() => this.aiAction(), 1000);
	}

	aiAction() {
		let ship = this.aiShips[Math.floor(Math.random() * this.aiShips.length)];
		if (ship && !ship.isControlled) {
			this.spaceObjectService.spaceObjects$.update(ship.$key, { isControlled: true }).then(() => {
				let order = Math.floor(Math.random() * 4);
				switch (order) {
					case 0:
						//move
						this.moveForward(ship);
						break;
					case 1:
						//port
						this.rotateLeft(ship);
						break;
					case 2:
						//stb
						this.rotateRight(ship);
						break;
					case 3:
						this.pewPew(ship);
						break;
				}
				setTimeout(() => this.spaceObjectService.spaceObjects$.update(ship.$key, { isControlled: false }), 2000);
			});

		}
	}

	createAIShip() {
		let planetX = Math.floor(Math.random() * this.settings.mapExtent);
		let planetY = Math.floor(Math.random() * this.settings.mapExtent);
		if (!this.fullGrid[planetX][planetY].contents) {
			this.spaceObjectService.createAIShip(planetX, planetY);
		}
	}

	createAsteroid() {
		let planetX = Math.floor(Math.random() * this.settings.mapExtent);
		let planetY = Math.floor(Math.random() * this.settings.mapExtent);
		if (!this.fullGrid[planetX][planetY].planet) {
			this.spaceObjectService.createAsteroid(planetX, planetY);
		}
	}

	createPlanet() {
		let planetX = Math.floor(Math.random() * this.settings.mapExtent);
		let planetY = Math.floor(Math.random() * this.settings.mapExtent);
		if (!this.fullGrid[planetX][planetY].planet) {
			this.spaceObjectService.createPlanet(planetX, planetY, null);
		}
	}

	doAnimations(facing) {
		let animation;
		switch (facing) {
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

	pewPew(aiShip) {
		let shootingShip = aiShip || this.ship;
		for (let i = 1; i <= this.settings.baseWeaponRange; i++) {
			let x = 0;
			let y = 0;
			switch (shootingShip.facing) {
				case 0:
					x = this.wraparound(shootingShip.x - i, this.settings.mapExtent);
					y = (shootingShip.y);
					break;
				case 1:
					x = (shootingShip.x);
					y = this.wraparound(shootingShip.y + i, this.settings.mapExtent);
					break;
				case 2:
					x = this.wraparound(shootingShip.x + i, this.settings.mapExtent);
					y = (shootingShip.y);
					break;
				case 3:
					x = (shootingShip.x);
					y = this.wraparound(shootingShip.y - i, this.settings.mapExtent);
					break;
			}
			let hit = false;
			this.ships.forEach(function(ship) {
				if (ship.x === x && ship.y === y) {
					ship.currentScore = ship.currentScore - this.settings.baseWeaponDamage > 0 ? ship.currentScore - this.settings.baseWeaponDamage : 0;
					ship.stolenScore = ship.stolenScore ? ship.stolenScore + this.settings.baseWeaponDamage : this.settings.baseWeaponDamage;
					ship.health = ship.health ? ship.health - this.settings.baseWeaponDamage : this.settings.baseShipHealth - this.settings.baseWeaponDamage;
					if (!aiShip) {
						this.ship.currentScore++;
						this.ship.totalScore++;
						this.userService.scoreOwnShip(this.ship);
						this.userService.scoreShip(ship);
					}
					hit = true;
					this.spaceObjectService.createBoom(x, y, true);
				}
			}.bind(this));
			if (!hit) {
				this.spaceObjects.forEach(object => {
					if (object.type === SpaceObjectType.AIShip && object.x === x && object.y === y) {
						let ship = object as AIShip;
						ship.health = ship.health ? ship.health - this.settings.baseWeaponDamage : this.settings.baseShipHealth - this.settings.baseWeaponDamage;
						if (!aiShip) {
							this.ship.currentScore++;
							this.ship.totalScore++;
							this.userService.scoreOwnShip(this.ship);
						}
						this.spaceObjectService.damage(ship);
						hit = true;
						this.spaceObjectService.createBoom(x, y, true);
					}
				});
			}
			if (!hit) {
				this.spaceObjectService.createBoom(x, y, false);
			}
		}
	}

	collisionCheck(x, y) {
		let collide = false;
		this.ships.forEach(function(ship) {
			if (ship.x === x && ship.y === y && ship.$key !== this.ship.$key) {
				collide = true;
			}
		}.bind(this));
		this.aiShips.forEach(function(ship) {
			if (ship.x === x && ship.y === y && ship.$key !== this.ship.$key) {
				collide = true;
			}
		}.bind(this));
		return collide;
	}

	forwardCell(ship) {
		switch (ship.facing) {
			case 0:
				return [this.wraparound(ship.x - 1, this.settings.mapExtent), (ship.y)];
			case 1:
				return [(ship.x), this.wraparound(ship.y + 1, this.settings.mapExtent)];
			case 2:
				return [this.wraparound(ship.x + 1, this.settings.mapExtent), (ship.y)];
			case 3:
				return [(ship.x), this.wraparound(ship.y - 1, this.settings.mapExtent)];
		}
	}

	moveForward(ship) {
		let movingShip = ship || this.ship;
		let move = this.forwardCell(movingShip);
		if (this.collisionCheck(move[0], move[1])) {
			console.log("can't move there");
			return;
		}
		movingShip.x = move[0];
		movingShip.y = move[1];
		movingShip.x = this.wraparound(movingShip.x, this.settings.mapExtent);
		movingShip.y = this.wraparound(movingShip.y, this.settings.mapExtent);
		this.populateGrid();
		if (!ship) {
			this.doAnimations(movingShip.facing);
		}
		this.updateShip(movingShip, !!ship);
	}

	rotateRight(ship) {
		let turningShip = ship || this.ship;
		let oldFacing = turningShip.facing;
		if (turningShip.facing < 3) {
			turningShip.facing++;
		} else {
			turningShip.facing = 0;
		}
		this.updateShip(turningShip, !!ship);
	}

	rotateLeft(ship) {
		let turningShip = ship || this.ship;
		let oldFacing = turningShip.facing;
		if (turningShip.facing) {
			turningShip.facing--;
		} else {
			turningShip.facing = 3;
		}
		this.updateShip(turningShip, !!ship);
	}

	updateShip(ship, isAi) {
		if (isAi) {
			this.spaceObjectService.spaceObjects$.update(ship.$key, {
				x: ship.x,
				y: ship.y,
				facing: ship.facing
			});
		} else {
			this.userService.moveShip(ship);
		}
	}

	mine() {
		let asteroid = this.fullGrid[this.ship.x][this.ship.y].planet;
		if (asteroid && asteroid.type === SpaceObjectType.Asteroid) {
			asteroid.size--;
			this.ship.currentScore++;
			this.ship.totalScore++;
			this.userService.scoreOwnShip(this.ship);
			if (asteroid.size) {
				this.spaceObjectService.spaceObjects$.update(asteroid.$key, { size: asteroid.size });
			} else {
				this.spaceObjectService.spaceObjects$.remove(asteroid.$key);
			}
		}
	}

	trade() {
		let planet = this.fullGrid[this.ship.x][this.ship.y].planet;
		if (planet) {
			if (this.tradeMission) {
				let x = Math.abs(this.tradeMission.x - this.ship.x);
				let y = Math.abs(this.tradeMission.y - this.ship.y);
				if (x > 50) {
					x = x - 50;
				}
				if (y > 50) {
					y = y - 50;
				}
				this.ship.currentScore += (x + y) / 2;
				this.ship.totalScore += (x + y) / 2;
				this.userService.scoreOwnShip(this.ship);
				this.tradeMission = undefined;
			} else {
				this.tradeMission = { x: this.ship.x, y: this.ship.y };
			}
		}
	}

	actionMoveForward() {
		if (this.currentAction && this.currentAction.label !== 'Move Forward') {
			this.currentAction.active = false;
		}
		if (!this.currentAction || (this.currentAction && this.currentAction.label !== 'Move Forward')) {
			this._nextActionSource.next(new Action('Move Forward', this.moveForward.bind(this), this.settings.actionDelay));
		}
	}

	actionRotateLeft() {
		if (this.currentAction && this.currentAction.label !== 'Rotate Left') {
			this.currentAction.active = false;
		}
		if (!this.currentAction || (this.currentAction && this.currentAction.label !== 'Rotate Left')) {
			this._nextActionSource.next(new Action('Rotate Left', this.rotateLeft.bind(this), this.settings.actionDelay));
		}
	}

	actionRotateRight() {
		if (this.currentAction && this.currentAction.label !== 'Rotate Right') {
			this.currentAction.active = false;
		}
		if (!this.currentAction || (this.currentAction && this.currentAction.label !== 'Rotate Right')) {
			this._nextActionSource.next(new Action('Rotate Right', this.rotateRight.bind(this), this.settings.actionDelay));
		}
	}

	actionFireWeapon() {
		if (this.currentAction && this.currentAction.label !== 'Fire') {
			this.currentAction.active = false;
		}
		if (!this.currentAction || (this.currentAction && this.currentAction.label !== 'Fire')) {
			this._nextActionSource.next(new Action('Fire', this.pewPew.bind(this), this.settings.actionDelay));
		}
	}

	actionMine() {
		if (this.currentAction && this.currentAction.label !== 'Mine') {
			this.currentAction.active = false;
		}
		if (!this.currentAction || (this.currentAction && this.currentAction.label !== 'Mine')) {
			this._nextActionSource.next(new Action('Mine', this.mine.bind(this), this.settings.actionDelay));
		}
	}

	actionTrade() {
		if (this.currentAction && this.currentAction.label !== 'Trade') {
			this.currentAction.active = false;
		}
		if (!this.currentAction || (this.currentAction && this.currentAction.label !== 'Trade')) {
			this._nextActionSource.next(new Action('Trade', this.trade.bind(this), this.settings.actionDelay));
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
		this.ships.forEach(ship => {
			let shipKeys = Object.keys(ship);
			if (shipKeys.indexOf('x') > -1 && shipKeys.indexOf('y') > -1) {
				if (this.fullGrid[ship.x][ship.y].contents !== null) {
					let gridShip: User = this.fullGrid[ship.x][ship.y].contents;

					if (gridShip && gridShip.x === ship.x && gridShip.y === ship.y && gridShip.facing === ship.facing && gridShip.$key === ship.$key) {
						//don't do anything, ship didn't rotate or move
					} else {
						if (gridShip && gridShip.x === ship.x && gridShip.y === ship.y) {
							// ship may be rotating
							this.fullGrid[ship.x][ship.y].contents = ship;
						} else {
							this.fullGrid[ship.x][ship.y].contents = ship;
							this.fullGrid[ship.lastX][ship.lastY].contents = null;
						}
					}
				} else {
					// ship moved into an empty space
					if (shipKeys.indexOf('lastX') > -1 && shipKeys.indexOf('lastY') > -1) {
						if (this.fullGrid[ship.lastX][ship.lastY].contents && this.fullGrid[ship.lastX][ship.lastY].contents.$key === ship.$key) {
							this.fullGrid[ship.lastX][ship.lastY].contents = null;
						}
					}
					this.fullGrid[ship.x][ship.y].contents = ship;
				}
			}
		});
		if (this.ship) {
			let visibleX = this.ship.x + 1 - Math.floor(this.settings.mapX / 2);
			let visibleY = this.ship.y + 1 - Math.floor(this.settings.mapY / 2);
			for (let i = 0; i < this.settings.mapX; i++) {
				for (let j = 0; j < this.settings.mapY; j++) {
					let gridX = this.wraparound(i + visibleX, this.settings.mapExtent);
					let gridY = this.wraparound(j + visibleY, this.settings.mapExtent);
					this.visibleGrid[i][j] = this.fullGrid[gridX][gridY];
				}
			}
			this.gridObserver.next(this.visibleGrid);
		}
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
