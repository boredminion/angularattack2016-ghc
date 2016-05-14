import {Component, OnInit, Input} from '@angular/core';
import {UserService} from '../shared';
import {DisplayNameComponent} from '../display-name';

@Component({
  moduleId: module.id,
  directives: [DisplayNameComponent],
  selector: 'app-users',
  templateUrl: 'users.component.html',
  styleUrls: ['users.component.css']
})
export class UsersComponent implements OnInit {
  user: any;
  constructor(private userService: UserService) {
    this.user = userService.currentUser;
  }

  ngOnInit() {}
}
