import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared';
import {SpaceObjectService} from '../ship';

@Component({
  moduleId: module.id,
  selector: 'app-scores',
  templateUrl: 'scores.component.html',
  styleUrls: ['scores.component.css']
})
export class ScoresComponent implements OnInit {

  constructor(private userService: UserService, private shipService: SpaceObjectService) {}

  ngOnInit() {
  }

}
