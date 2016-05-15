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
var shared_2 = require('../shared');
var ShipyardComponent = (function () {
    function ShipyardComponent(globalService, userService) {
        var _this = this;
        this.globalService = globalService;
        this.userService = userService;
        this.money = 0;
        this.upgrades = [];
        this.userUpgrades = [];
        this.userService.currentUser.subscribe(function (user) {
            if (user) {
                if (user.upgrades) {
                    _this.userUpgrades = Object.keys(user.upgrades).map(function (key) {
                        return user.upgrades[key];
                    });
                }
                _this.money = user.currentScore;
            }
        });
        globalService.upgrades.subscribe(function (upgrades) { return _this.upgrades = upgrades; });
    }
    ShipyardComponent.prototype.ngOnInit = function () {
    };
    ShipyardComponent.prototype.buyUpgrade = function (upgrade) {
        this.userService.buyUpgrade(upgrade);
    };
    ShipyardComponent.prototype.userPurchased = function (upgradeKey) {
        return this.userUpgrades.indexOf(upgradeKey) > -1;
    };
    ShipyardComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-shipyard',
            pipes: [shared_2.Upgrades],
            templateUrl: 'shipyard.component.html',
            styleUrls: ['shipyard.component.css']
        }), 
        __metadata('design:paramtypes', [shared_1.GlobalService, shared_2.UserService])
    ], ShipyardComponent);
    return ShipyardComponent;
}());
exports.ShipyardComponent = ShipyardComponent;
//# sourceMappingURL=shipyard.component.js.map