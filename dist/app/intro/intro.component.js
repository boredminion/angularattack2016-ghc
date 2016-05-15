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
var shared_1 = require('../shared');
var IntroComponent = (function () {
    function IntroComponent(userService) {
        var _this = this;
        this.userService = userService;
        this.selectedShip = 'spaceship-300x165.png';
        this.shipOptions = [
            'spaceship-300x165.png',
            'spaceship10-240x136.png',
            'spaceship14-240x185.png',
            'spaceship15-215x240.png',
            'spaceship16-140x240.png',
            'spaceship2-300x126.png',
            'spaceship8-240x146.png',
            'spaceship9-240x154.png',
            'rocketship2-159x300.png'
        ];
        userService.currentUser.subscribe(function (user) {
            if (user && user.image && user.shipName) {
                _this.selectedShip = user.image || 'spaceship-300x165.png';
                _this.shipName = user.shipName;
            }
        });
    }
    IntroComponent.prototype.ngOnInit = function () {
    };
    IntroComponent.prototype.selectShip = function (ship) {
        this.selectedShip = ship;
    };
    IntroComponent.prototype.save = function () {
        this.userService.setShipName(this.shipName, this.selectedShip, null, null, null);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], IntroComponent.prototype, "model", void 0);
    IntroComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-intro',
            templateUrl: 'intro.component.html',
            styleUrls: ['intro.component.css']
        }), 
        __metadata('design:paramtypes', [shared_1.UserService])
    ], IntroComponent);
    return IntroComponent;
}());
exports.IntroComponent = IntroComponent;
//# sourceMappingURL=intro.component.js.map