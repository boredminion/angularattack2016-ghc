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
var NavbarComponent = (function () {
    function NavbarComponent() {
        this.signOut = new core_1.EventEmitter(false);
        this.signInWithGithub = new core_1.EventEmitter(false);
        this.signInWithTwitter = new core_1.EventEmitter(false);
    }
    NavbarComponent.prototype.ngOnInit = function () { };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], NavbarComponent.prototype, "authenticated", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], NavbarComponent.prototype, "score", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], NavbarComponent.prototype, "intro", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], NavbarComponent.prototype, "signOut", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], NavbarComponent.prototype, "signInWithGithub", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], NavbarComponent.prototype, "signInWithTwitter", void 0);
    NavbarComponent = __decorate([
        core_1.Component({
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            directives: [router_1.ROUTER_DIRECTIVES],
            moduleId: module.id,
            selector: 'app-navbar',
            templateUrl: 'navbar.component.html',
            styleUrls: ['navbar.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;
//# sourceMappingURL=navbar.component.js.map