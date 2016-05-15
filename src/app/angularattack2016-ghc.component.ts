import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, Routes} from '@angular/router';
import {Location} from '@angular/common';
import {NavbarComponent} from './navbar';
import {WelcomeComponent} from './welcome';
import {MessagesComponent} from './messages';
import {MapComponent} from './map';
import {ShipyardComponent} from './shipyard';
import {AdminComponent} from './admin';
import {ScoresComponent} from './scores';
import {IntroComponent} from './intro';
import {AuthService, UserService} from './shared';

@Component({
  moduleId: module.id,
  directives: [ROUTER_DIRECTIVES, NavbarComponent],
  selector: 'angularattack2016-ghc-app',
  templateUrl: 'angularattack2016-ghc.component.html',
  styleUrls: ['angularattack2016-ghc.component.css']
})

@Routes([
  { path: '/', component: WelcomeComponent }, { path: '/chat', component: MessagesComponent },
  { path: '/map', component: MapComponent }, { path: '/shipyard', component: ShipyardComponent },
  { path: '/admin', component: AdminComponent }, { path: '/scores', component: ScoresComponent },
  { path: '/intro', component: IntroComponent }
])

export class Angularattack2016GhcAppComponent implements OnInit {
  title = 'angularattack2016-ghc works!';

  constructor(private auth: AuthService, private userService: UserService, private router: Router, private location: Location) {
  }

  checkIntro() {
    this.userService.currentUser.subscribe(user => {
      if (!user.image) {
        this.router.navigate(['/intro']);
      } else {
        if (this.location.path() === '') {
          this.router.navigate(['/map']);
        }
      }
    });
  }

  ngOnInit() {
    if (this.auth.authenticated) {
      this.checkIntro();
    } else {
      this.router.navigate(['/']);
    }
  }

  signOut(): void {
    this.userService.setOffline();
    this.auth.signOut();
    window.location.replace('/');
  }

  signInWithGithub(): void {
    this.auth.signInWithGithub().then(
      (value) => {
        // on fulfilled
        // this.userService.setOnline(); // this didn't work, refreshing the page sets a user
        // online though
        window.location.replace('/map');
      },
      (err) => {
        // on rejected
      });
  }
}
