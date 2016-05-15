import {Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, Output} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {UserService, User} from '../shared';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [ROUTER_DIRECTIVES],
  moduleId: module.id,
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() authenticated: boolean;
  @Input() score: number;
  @Input() intro: boolean;
  @Output() signOut: EventEmitter<any> = new EventEmitter(false);
  @Output() signInWithGithub: EventEmitter<any> = new EventEmitter(false);
  @Output() signInWithTwitter: EventEmitter<any> = new EventEmitter(false);
  
  constructor() {}

  ngOnInit() {}
}
