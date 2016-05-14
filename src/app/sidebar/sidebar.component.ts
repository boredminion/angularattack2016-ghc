import { Component, OnInit } from '@angular/core';
import {MessagesComponent} from '../messages';
import {UsersComponent} from '../users';
import {ControlsComponent} from '../controls';

@Component({
  moduleId: module.id,
  directives: [MessagesComponent, UsersComponent, ControlsComponent],
  selector: 'app-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
