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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var angularfire2_1 = require('angularfire2');
var Settings = (function () {
    function Settings() {
        this.upgrades = [];
        this.bounty = 50;
        this.mapExtent = 100;
        this.mapX = 9;
        this.mapY = 11;
        this.maxPlanets = 100;
        this.maxAsteroids = 50;
        this.maxAIShips = 100;
        this.actionDelay = 2;
        this.baseShipHealth = 100;
        this.baseWeaponDamage = 10;
        this.baseWeaponRange = 1;
        this.mineValue = 10;
        this.tradeValue = 10;
    }
    return Settings;
}());
exports.Settings = Settings;
var GlobalService = (function () {
    function GlobalService(af, ref) {
        var _this = this;
        this.af = af;
        this.globalSettings = new Settings();
        this.globalSettings$ = this.af.database.object("/settings");
        this.upgrades = this.af.database.list("/settings/upgrades");
        this.globalSettings$.subscribe(function (settings) {
            if (settings === null) {
                _this.save(new Settings());
            }
            else {
                _this.globalSettings = settings;
            }
        });
    }
    GlobalService.prototype.save = function (newSettings) {
        this.globalSettings$.set(newSettings);
    };
    GlobalService.prototype.saveUpgrade = function (newUpgrade) {
        this.upgrades.push(newUpgrade);
    };
    GlobalService.prototype.removeUpgrade = function (upgradeKey) {
        this.upgrades.remove(upgradeKey);
    };
    GlobalService = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Inject(angularfire2_1.FirebaseRef)), 
        __metadata('design:paramtypes', [angularfire2_1.AngularFire, Firebase])
    ], GlobalService);
    return GlobalService;
}());
exports.GlobalService = GlobalService;
//# sourceMappingURL=global.service.js.map