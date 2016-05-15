import {Injectable} from '@angular/core';
import {AuthProviders, FirebaseAuth, FirebaseAuthState} from 'angularfire2';


@Injectable()
export class AuthService {
  private authState: FirebaseAuthData|FirebaseAuthState;

  constructor(public auth$: FirebaseAuth) {
    this.authState = auth$.getAuth();

    auth$.subscribe((state: FirebaseAuthState) => { this.authState = state; });
  }

  get authenticated(): boolean { return this.authState !== null && !this.expired; }

  get expired(): boolean { return !this.authState || (this.authState.expires * 1000) < Date.now(); }

  get id(): string { return this.authenticated ? this.authState.uid : ''; }

  get username(): string {
    let username = '';
    if (this.authenticated && Object.keys(this.authState).indexOf('github') > -1) {
      username = this.authState.github.username;
    }
    if (this.authenticated && Object.keys(this.authState).indexOf('twitter') > -1) {
      username = this.authState.twitter.username;
    }
    return this.authenticated ? username : '';
  }
  
  get profileLink(): string {
    let url = '';
    if (this.authenticated && Object.keys(this.authState).indexOf('github') > -1) {
      url = 'https://github.com/' + this.authState.github.username + '';
    }
    if (this.authenticated && Object.keys(this.authState).indexOf('twitter') > -1) {
      url = 'https://twitter.com/' + this.authState.twitter.username;
    }
    return this.authenticated ? url : '';
  }

  signInWithGithub(): Promise<FirebaseAuthState> {
    // signin doesn't set the user online, and can't use userService in here because of circular
    // dependency
    // sign the user online via angularattack2016-ghc.component.ts (window refresh)
    return this.auth$.login({provider: AuthProviders.Github});
  }
  
  signInWithTwitter(): Promise<FirebaseAuthState> {
    // signin doesn't set the user online, and can't use userService in here because of circular
    // dependency
    // sign the user online via angularattack2016-ghc.component.ts (window refresh)
    return this.auth$.login({provider: AuthProviders.Twitter});
  }

  signOut(): void { this.auth$.logout(); }
}
