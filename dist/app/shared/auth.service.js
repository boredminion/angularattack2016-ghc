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
var angularfire2_1 = require('angularfire2');
var AuthService = (function () {
    function AuthService(auth$) {
        var _this = this;
        this.auth$ = auth$;
        this.authState = auth$.getAuth();
        auth$.subscribe(function (state) { _this.authState = state; });
    }
    Object.defineProperty(AuthService.prototype, "authenticated", {
        get: function () { return this.authState !== null && !this.expired; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "expired", {
        get: function () { return !this.authState || (this.authState.expires * 1000) < Date.now(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "id", {
        get: function () { return this.authenticated ? this.authState.uid : ''; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "username", {
        get: function () {
            var username = '';
            if (this.authenticated && Object.keys(this.authState).indexOf('github') > -1) {
                username = this.authState.github.username;
            }
            if (this.authenticated && Object.keys(this.authState).indexOf('twitter') > -1) {
                username = this.authState.twitter.username;
            }
            return this.authenticated ? username : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "profileLink", {
        get: function () {
            var url = '';
            if (this.authenticated && Object.keys(this.authState).indexOf('github') > -1) {
                url = 'https://github.com/' + this.authState.github.username + '';
            }
            if (this.authenticated && Object.keys(this.authState).indexOf('twitter') > -1) {
                url = 'https://twitter.com/' + this.authState.twitter.username;
            }
            return this.authenticated ? url : '';
        },
        enumerable: true,
        configurable: true
    });
    AuthService.prototype.signInWithGithub = function () {
        // signin doesn't set the user online, and can't use userService in here because of circular
        // dependency
        // sign the user online via angularattack2016-ghc.component.ts (window refresh)
        return this.auth$.login({ provider: angularfire2_1.AuthProviders.Github });
    };
    AuthService.prototype.signInWithTwitter = function () {
        // signin doesn't set the user online, and can't use userService in here because of circular
        // dependency
        // sign the user online via angularattack2016-ghc.component.ts (window refresh)
        return this.auth$.login({ provider: angularfire2_1.AuthProviders.Twitter });
    };
    AuthService.prototype.signOut = function () { this.auth$.logout(); };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [angularfire2_1.FirebaseAuth])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map