import {bootstrap} from '@angular/platform-browser-dynamic';
import {ROUTER_PROVIDERS} from '@angular/router';
import {ComponentRef, enableProdMode, provide} from '@angular/core';
import {Angularattack2016GhcAppComponent, environment} from './app/';
import {FIREBASE_APP_PROVIDERS} from './app/firebase';
import {AuthService, AuthRouteService, AUTH_PROVIDERS, UserService, USER_PROVIDERS} from './app/shared';
import {MESSAGES_PROVIDERS} from './app/messages';
import {MAP_PROVIDERS} from './app/map';
import {SPACE_OBJECT_PROVIDERS} from './app/ship';

if (environment.production) {
  enableProdMode();
}

const providers: any[] = [
	AUTH_PROVIDERS, FIREBASE_APP_PROVIDERS, ROUTER_PROVIDERS, USER_PROVIDERS, MESSAGES_PROVIDERS, MAP_PROVIDERS, SPACE_OBJECT_PROVIDERS
  //, provide(APP_BASE_HREF, {useValue: '/'})
];

bootstrap(Angularattack2016GhcAppComponent, providers)
    .then((appRef: ComponentRef<any>) => AuthRouteService.injector(appRef.injector))
    .catch((error: Error) => console.error(error));