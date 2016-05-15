"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var navbar_1 = require('./navbar');
var welcome_1 = require('./welcome');
var messages_1 = require('./messages');
var map_1 = require('./map');
var shipyard_1 = require('./shipyard');
var admin_1 = require('./admin');
var scores_1 = require('./scores');
var intro_1 = require('./intro');
var shared_1 = require('./shared');
var angular2_toaster_1 = require('angular2-toaster/angular2-toaster');
var Angularattack2016GhcAppComponent = (function () {
    function Angularattack2016GhcAppComponent(notificationsService, toasterService, auth, userService, router, location) {
        var _this = this;
        this.notificationsService = notificationsService;
        this.toasterService = toasterService;
        this.auth = auth;
        this.userService = userService;
        this.router = router;
        this.location = location;
        this.title = 'angularattack2016-ghc works!';
        this.score = 0;
        this.intro = true;
        this.toasterconfig = new angular2_toaster_1.ToasterConfig({
            positionClass: 'toast-top-center'
        });
        notificationsService.notification$.subscribe(function (notification) {
            _this.toasterService.pop(notification.type, notification.title, notification.message);
        });
        userService.currentUser.subscribe(function (user) {
            if (user && user.currentScore) {
                _this.score = user.currentScore;
            }
        });
    }
    Angularattack2016GhcAppComponent.prototype.checkIntro = function () {
        var _this = this;
        this.userService.currentUser.subscribe(function (user) {
            if (_this.auth.authenticated) {
                if (!user || Object.keys(user).length < 5 || !user.image) {
                    _this.router.navigate(['/intro']);
                }
                else {
                    _this.intro = false;
                    if (_this.location.path() === '') {
                        _this.router.navigate(['/map']);
                    }
                }
            }
            else {
                _this.router.navigate(['/']);
            }
        });
    };
    Angularattack2016GhcAppComponent.prototype.ngOnInit = function () {
        if (this.auth.authenticated) {
            this.checkIntro();
        }
        else {
            this.router.navigate(['/']);
        }
    };
    Angularattack2016GhcAppComponent.prototype.signOut = function () {
        this.userService.setOffline();
        this.auth.signOut();
        this.router.navigate(['/']);
    };
    Angularattack2016GhcAppComponent.prototype.signInWithGithub = function () {
        var _this = this;
        this.auth.signInWithGithub().then(function (value) {
            _this.checkIntro();
        }, function (err) {
            // on rejected
        });
    };
    Angularattack2016GhcAppComponent.prototype.signInWithTwitter = function () {
        var _this = this;
        this.auth.signInWithTwitter().then(function (value) {
            _this.checkIntro();
        }, function (err) {
            // on rejected
        });
    };
    Angularattack2016GhcAppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            directives: [router_1.ROUTER_DIRECTIVES, navbar_1.NavbarComponent, angular2_toaster_1.ToasterContainerComponent],
            providers: [angular2_toaster_1.ToasterService],
            selector: 'angularattack2016-ghc-app',
            templateUrl: 'angularattack2016-ghc.component.html',
            styleUrls: ['angularattack2016-ghc.component.css']
        }),
        router_1.Routes([
            { path: '/', component: welcome_1.WelcomeComponent }, { path: '/chat', component: messages_1.MessagesComponent },
            { path: '/map', component: map_1.MapComponent }, { path: '/shipyard', component: shipyard_1.ShipyardComponent },
            { path: '/admin', component: admin_1.AdminComponent }, { path: '/scores', component: scores_1.ScoresComponent },
            { path: '/intro', component: intro_1.IntroComponent }, { path: '*', component: welcome_1.WelcomeComponent }
        ]), 
        __metadata('design:paramtypes', [shared_1.NotificationsService, angular2_toaster_1.ToasterService, shared_1.AuthService, shared_1.UserService, router_1.Router, common_1.Location])
    ], Angularattack2016GhcAppComponent);
    return Angularattack2016GhcAppComponent;
}());
exports.Angularattack2016GhcAppComponent = Angularattack2016GhcAppComponent;
//# sourceMappingURL=angularattack2016-ghc.component.js.map