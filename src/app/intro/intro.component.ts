import { Component, OnInit, Input} from '@angular/core';
import { UserService } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-intro',
  templateUrl: 'intro.component.html',
  styleUrls: ['intro.component.css']
})
export class IntroComponent implements OnInit {
  @Input() model;
  shipName: string;
  selectedShip: string;
  shipOptions: string[];

  constructor(private userService: UserService) {
    this.selectedShip = 'spaceship-300x165.png';
    this.shipOptions = [
      'spaceship-300x165.png',
      'spaceship10-240x136.png',
      'spaceship14-240x185.png',
      'spaceship15-215x240.png',
      'spaceship16-140x240.png',
      'spaceship2-300x126.png',
      'spaceship8-240x146.png',
      'spaceship9-240x154.png',
      'rocketship2-159x300.png'
    ];
    userService.currentUser.subscribe(user => {
      this.selectedShip = user.image || 'spaceship-300x165.png';
      this.shipName = user.shipName;
    });
  }

  ngOnInit() {
  }
  
  selectShip(ship:string) {
    this.selectedShip = ship;
  }
  
  save() {
    this.userService.setShipName(this.shipName, this.selectedShip, null, null, null);
  }

}
