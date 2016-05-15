import {bootstrap} from '@angular/platform-browser-dynamic';
import {ROUTER_PROVIDERS} from '@angular/router';
import {ComponentRef, enableProdMode, provide} from '@angular/core';
import {Angularattack2016GhcAppComponent, environment} from './app/';
import {FIREBASE_APP_PROVIDERS} from './app/firebase';
import {AuthRouteService, SHARED_PROVIDERS} from './app/shared';
import {MESSAGES_PROVIDERS} from './app/messages';
import {MAP_PROVIDERS} from './app/map';
import {SPACE_OBJECT_PROVIDERS} from './app/ship';
import {ToasterService} from 'angular2-toaster/angular2-toaster';

if (environment.production) {
  enableProdMode();
}

export const TOASTER_PROVIDER: any[] = [ToasterService];

const providers: any[] = [
  TOASTER_PROVIDER, SHARED_PROVIDERS, FIREBASE_APP_PROVIDERS, ROUTER_PROVIDERS, MESSAGES_PROVIDERS, MAP_PROVIDERS, SPACE_OBJECT_PROVIDERS
  //, provide(APP_BASE_HREF, {useValue: '/'})
];

bootstrap(Angularattack2016GhcAppComponent, providers)
    .then((appRef: ComponentRef<any>) => AuthRouteService.injector(appRef.injector))
    .catch((error: Error) => console.error(error));