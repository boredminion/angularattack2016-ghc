import {Component, OnInit} from '@angular/core';
import {CellComponent} from '../cell';
import {MessagesComponent} from '../messages';

export enum Direction {
  Coreward,
  Trailing,
  Rimward,
  Spinward
}

export interface ICell {
  x: number;
  y: number;
  contents: any;
}

export interface IShip { facing: Direction; }

export class Cell {
  x: number;
  y: number;
  contents: any;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export class Ship {
  facing: Direction;
  x: number;
  y: number;
  constructor(dir, x, y) { this.facing = dir; this.x = x; this.y = y;}
}

@Component({
  directives: [CellComponent, MessagesComponent],
  moduleId: module.id,
  selector: 'app-map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css'],
  host: { '(window:keydown)': 'keyAction($event)' },
})
export class MapComponent implements OnInit {
  x: number = 9;
  y: number = 11;
  grid: ICell[][] = [];
  ship: Ship = new Ship(Direction.Coreward, 4, 5);


  constructor() {}

  ngOnInit() {
	  this.populateGrid();
  }

  keyAction(event: KeyboardEvent) {
	  console.log(event.keyCode);
	  if(event.keyCode === 38 || event.keyCode === 87) {
	  	switch(this.ship.facing) {
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
	  	if(this.ship.x > this.x) {
				this.ship.x = 0;		
	  	}
	  	if(this.ship.x < 0) {
				this.ship.x = this.x;
	  	}
	  	if(this.ship.y > this.y) {
				this.ship.y = 0;
	  	}
	  	if(this.ship.y < 0) {
				this.ship.y = this.y;
	  	}

			this.populateGrid();
	  }
	  if(event.keyCode === 37 || event.keyCode === 65) {
	  	if(this.ship.facing) {
		  this.ship.facing--;
	  	} else {
	  	  this.ship.facing = 3;
	  	}
	  }
	  if (event.keyCode === 39 || event.keyCode === 68) {
	  	if(this.ship.facing < 3) {
		  this.ship.facing++;
	  	} else {
			this.ship.facing = 0;
	  	}
	  }
  }

  populateGrid() {
	  for (let i = 0; i < this.x; i++) {
		  this.grid[i] = [];
		  for (let j = 0; j < this.y; j++) {
			  this.grid[i][j] = new Cell(i, j);
			  if(this.ship.x === i && this.ship.y === j) {
				  this.grid[i][j].contents = this.ship;
			  }
		  }
	  } 
 }

}
