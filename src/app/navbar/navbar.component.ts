import {Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, Output} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  moduleId: module.id,
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() authenticated: boolean;
  @Output() signOut: EventEmitter<any> = new EventEmitter(false);
  @Output() signInWithGithub: EventEmitter<any> = new EventEmitter(false);

  constructor() {}

  ngOnInit() {}
}
