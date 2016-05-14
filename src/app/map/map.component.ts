import {Component, OnInit} from '@angular/core';
import {CellComponent, Cell} from '../cell';
import {MessagesComponent} from '../messages';
import {MapService} from './map.service';

@Component({
	directives: [CellComponent, MessagesComponent],
	moduleId: module.id,
	selector: 'app-map',
	templateUrl: 'map.component.html',
	styleUrls: ['map.component.css'],
	host: { '(window:keydown)': 'keyAction($event)' },
})
export class MapComponent implements OnInit {
	grid: Cell[][] = [];

	constructor(private mapService: MapService) {
		mapService.grid$.subscribe(grid => this.grid = grid);
	 }

	ngOnInit() {
		this.mapService.populateGrid();
	}

	keyAction($event) {
		this.mapService.keyAction($event);
	}

}
