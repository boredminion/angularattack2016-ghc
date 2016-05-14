import { Component, OnInit } from '@angular/core';
import { MapService } from '../map';

@Component({
  moduleId: module.id,
  selector: 'app-controls',
  templateUrl: 'controls.component.html',
  styleUrls: ['controls.component.css'],
  host: { '(window:keydown)': 'keyAction($event)' }
})
export class ControlsComponent implements OnInit {

  constructor(private mapService: MapService) {}

  ngOnInit() {
  }

  keyAction($event) {
    $event.preventDefault();
		this.mapService.keyAction($event);
	}
  
}
