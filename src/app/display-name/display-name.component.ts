import {Component, OnInit, Input} from '@angular/core';
import {UserService} from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-display-name',
  templateUrl: 'display-name.component.html',
  styleUrls: ['display-name.component.css']
})
export class DisplayNameComponent implements OnInit {
  @Input() model;
  authUid: string;
  user: any;
  myDisplayName: string = '';
  userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
    this.user = userService.currentUser;
  }

  ngOnInit() {}

  setDisplayName() { this.userService.setDisplayName(this.myDisplayName); }
}
