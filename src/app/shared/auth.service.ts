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

  get username(): string { return this.authenticated ? this.authState.github.username : ''; }

  signInWithGithub(): Promise<FirebaseAuthState> {
    // signin doesn't set the user online, and can't use userService in here because of circular
    // dependency
    // sign the user online via fireslack2.component.ts (window refresh)
    return this.auth$.login({provider: AuthProviders.Github});
  }

  signOut(): void { this.auth$.logout(); }
}
