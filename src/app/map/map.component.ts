import {Component, OnInit} from '@angular/core';
import {CellComponent, Cell} from '../cell';
import {SidebarComponent} from '../sidebar';
import {MapService} from './map.service';

@Component({
	directives: [CellComponent, SidebarComponent],
	moduleId: module.id,
	selector: 'app-map',
	templateUrl: 'map.component.html',
	styleUrls: ['map.component.css']
})
export class MapComponent implements OnInit {
	grid: Cell[][] = [];
	transitions: string;

	constructor(private mapService: MapService) {
		mapService.grid$.subscribe(grid => this.grid = grid);
		mapService.transitions$.subscribe(transitions => this.transitions = transitions);
	 }

	ngOnInit() {
	}

}
