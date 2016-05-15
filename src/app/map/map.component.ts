import {Component} from '@angular/core';
import {OnActivate, Router} from '@angular/router';
import {CellComponent, Cell} from '../cell';
import {SidebarComponent} from '../sidebar';
import {AuthService} from '../shared';
import {MapService} from './map.service';

@Component({
	directives: [CellComponent, SidebarComponent],
	moduleId: module.id,
	selector: 'app-map',
	templateUrl: 'map.component.html',
	styleUrls: ['map.component.css']
})
export class MapComponent implements OnActivate {
	grid: Cell[][] = [];
	transitions: string;

	constructor(private authService: AuthService,
		private router: Router,
		private mapService: MapService) {
		mapService.grid$.subscribe(grid => this.grid = grid);
		mapService.transitions$.subscribe(transitions => this.transitions = transitions);
	}

	routerOnActivate() {
		if (!this.authService.authenticated) {
			return this.router.navigate(['/']);
		}
		this.mapService.populateGrid();
	}

}
