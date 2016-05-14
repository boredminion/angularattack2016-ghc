import { Component } from '@angular/core';
import {NavbarComponent} from './navbar';

@Component({
  moduleId: module.id,
  directives: [NavbarComponent],
  selector: 'angularattack2016-ghc-app',
  templateUrl: 'angularattack2016-ghc.component.html',
  styleUrls: ['angularattack2016-ghc.component.css']
})
export class Angularattack2016GhcAppComponent {
  title = 'angularattack2016-ghc works!';
}
