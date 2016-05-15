import { Component, Input, OnInit } from '@angular/core';
import {ShipComponent} from '../ship';

@Component({
  directives: [ShipComponent],
  moduleId: module.id,
  selector: 'app-cell',
  templateUrl: 'cell.component.html',
  styleUrls: ['cell.component.css']
})
export class CellComponent implements OnInit {

  @Input()
  cell: any;

  @Input()
  transitions: string;

  constructor() { }

  ngOnInit() {
  }

}
