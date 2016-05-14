import { Component, OnInit } from '@angular/core';
import {MessagesComponent} from '../messages';
import {UsersComponent} from '../users';

@Component({
  moduleId: module.id,
  directives: [MessagesComponent, UsersComponent],
  selector: 'app-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
