import { Component, Input, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-ship',
  templateUrl: 'ship.component.html',
  styleUrls: ['ship.component.css']
})
export class ShipComponent implements OnInit {
  @Input()
  ship: any;

  @Input()
  transitions: string;

  constructor() { }

  ngOnInit() {
  }

  get classes(): string {
    let facing = this.ship.facing;
    let transitions = this.transitions || '';
    if (facing) {
    return 'facing-' + facing + ' ' + transitions;
    } else {
      return transitions;
    }
  }

}
