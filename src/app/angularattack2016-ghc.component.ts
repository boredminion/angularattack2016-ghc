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
import {AuthService, UserService, NotificationsService, Notification} from './shared';
import {ToasterContainerComponent, ToasterService} from 'angular2-toaster/angular2-toaster';


@Component({
  moduleId: module.id,
  directives: [ROUTER_DIRECTIVES, NavbarComponent, ToasterContainerComponent],
  providers: [ToasterService],
  selector: 'angularattack2016-ghc-app',
  templateUrl: 'angularattack2016-ghc.component.html',
  styleUrls: ['angularattack2016-ghc.component.css']
})

@Routes([
  { path: '/', component: WelcomeComponent }, { path: '/chat', component: MessagesComponent },
  { path: '/map', component: MapComponent }, { path: '/shipyard', component: ShipyardComponent },
  { path: '/admin', component: AdminComponent }, { path: '/scores', component: ScoresComponent },
  { path: '/intro', component: IntroComponent }, { path: '*', component: WelcomeComponent }
])

export class Angularattack2016GhcAppComponent implements OnInit {
  title = 'angularattack2016-ghc works!';
  score: number = 0;
  intro: boolean = true;

  constructor(private notificationsService: NotificationsService, private toasterService: ToasterService, private auth: AuthService, private userService: UserService, private router: Router, private location: Location) {
    notificationsService.notification$.subscribe(notification => {
      this.toasterService.pop(notification.type, notification.title, notification.message);
    });
    userService.currentUser.subscribe(user => {
      if (user && user.currentScore) {
        this.score = user.currentScore;
      }
    });
  }

  checkIntro() {
    this.userService.currentUser.subscribe(user => {
      if (this.auth.authenticated) {
        if (!user || Object.keys(user).length < 5 || !user.image) {
          this.router.navigate(['/intro']);
        } else {
          this.intro = false;
          if (this.location.path() === '') {
            this.router.navigate(['/map']);
          }
        }
      } else {
        this.router.navigate(['/']);
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
    this.router.navigate(['/']);
  }

  signInWithGithub(): void {
    this.auth.signInWithGithub().then(
      (value) => {
        this.checkIntro();
      },
      (err) => {
        // on rejected
      });
  }
  signInWithTwitter(): void {
    this.auth.signInWithTwitter().then(
      (value) => {
        this.checkIntro();
      },
      (err) => {
        // on rejected
      });
  }
}