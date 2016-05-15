import { Component, OnInit } from '@angular/core';
import {GlobalService, ISettings, Settings} from '../shared';
import {Upgrades, UserService, User} from '../shared';
import {Upgrade, UpgradeType} from '../ship';


@Component({
  moduleId: module.id,
  selector: 'app-shipyard',
  pipes: [Upgrades],
  templateUrl: 'shipyard.component.html',
  styleUrls: ['shipyard.component.css']
})
export class ShipyardComponent implements OnInit {
  money: number = 0;
  upgrades: Upgrade[] = [];

  constructor(private globalService: GlobalService, private userService: UserService) {
    this.userService.currentUser.subscribe(user => {
      this.money = user.currentScore;
    });
    globalService.upgrades.subscribe(upgrades => this.upgrades = upgrades);
  }

  ngOnInit() {
  }

}
