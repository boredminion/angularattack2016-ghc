import {Component, OnInit} from '@angular/core';
import {CellComponent, Cell} from '../cell';
import {SidebarComponent} from '../sidebar';
import {MapService} from './map.service';

@Component({
	directives: [CellComponent, SidebarComponent],
	moduleId: module.id,
	selector: 'app-map',
	templateUrl: 'map.component.html',
	styleUrls: ['map.component.css'],
	host: { '(window:keydown)': 'keyAction($event)' }
})
export class MapComponent implements OnInit {
	grid: Cell[][] = [];

	constructor(private mapService: MapService) {
		mapService.grid$.subscribe(grid => this.grid = grid);
	 }

	ngOnInit() {
	}

	keyAction($event: KeyboardEvent) {
		$event.preventDefault();
		this.mapService.keyAction($event);
	}

}
