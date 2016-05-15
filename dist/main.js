"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var router_1 = require('@angular/router');
var core_1 = require('@angular/core');
var _1 = require('./app/');
var firebase_1 = require('./app/firebase');
var shared_1 = require('./app/shared');
var messages_1 = require('./app/messages');
var map_1 = require('./app/map');
var ship_1 = require('./app/ship');
var angular2_toaster_1 = require('angular2-toaster/angular2-toaster');
    core_1.enableProdMode();
exports.TOASTER_PROVIDER = [angular2_toaster_1.ToasterService];
var providers = [
    exports.TOASTER_PROVIDER, shared_1.SHARED_PROVIDERS, firebase_1.FIREBASE_APP_PROVIDERS, router_1.ROUTER_PROVIDERS, messages_1.MESSAGES_PROVIDERS, map_1.MAP_PROVIDERS, ship_1.SPACE_OBJECT_PROVIDERS
];
platform_browser_dynamic_1.bootstrap(_1.Angularattack2016GhcAppComponent, providers)
    .then(function (appRef) { return shared_1.AuthRouteService.injector(appRef.injector); })
    .catch(function (error) { return console.error(error); });
//# sourceMappingURL=main.js.map