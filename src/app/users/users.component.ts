import {Component, OnInit, Input} from '@angular/core';
import {UserService, Online} from '../shared';

@Component({
  moduleId: module.id,
  pipes: [Online],
  selector: 'app-users',
  templateUrl: 'users.component.html',
  styleUrls: ['users.component.css']
})
export class UsersComponent implements OnInit {
  user: any;
  
  constructor(private userService: UserService) {
    userService.currentUser.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {}
}
