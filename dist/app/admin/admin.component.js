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
var map_1 = require('../map');
var shared_2 = require('../shared');
var ship_1 = require('../ship');
var AdminComponent = (function () {
    function AdminComponent(globalService, mapService, spaceObjectService, userService) {
        var _this = this;
        this.globalService = globalService;
        this.mapService = mapService;
        this.spaceObjectService = spaceObjectService;
        this.userService = userService;
        this.notAdmin = true;
        this.globalSettings = new shared_1.Settings();
        this.aiShips = [];
        this.asteroids = [];
        this.planets = [];
        this.upgrades = [];
        this.newArmor = new ship_1.Upgrade('', 0, ship_1.UpgradeType.Armor, 10000);
        this.newDamage = new ship_1.Upgrade('', 0, ship_1.UpgradeType.Damage, 10000);
        this.newRange = new ship_1.Upgrade('', 0, ship_1.UpgradeType.Range, 10000);
        this.userService.currentUser.subscribe(function (user) {
            _this.notAdmin = !user.admin;
        });
        globalService.globalSettings$.subscribe(function (settings) { return _this.globalSettings = settings; });
        globalService.upgrades.subscribe(function (upgrades) { return _this.upgrades = upgrades; });
        spaceObjectService.spaceObjects$.subscribe(function (spaceObjects) {
            _this.aiShips = [];
            _this.asteroids = [];
            _this.planets = [];
            spaceObjects.forEach(function (object) {
                switch (object.type) {
                    case ship_1.SpaceObjectType.AIShip:
                        _this.aiShips.push(object);
                        break;
                    case ship_1.SpaceObjectType.Asteroid:
                        _this.asteroids.push(object);
                        break;
                    case ship_1.SpaceObjectType.Planet:
                        _this.planets.push(object);
                        break;
                }
            });
        });
    }
    AdminComponent.prototype.ngOnInit = function () {
    };
    AdminComponent.prototype.save = function () {
        this.globalService.save(this.globalSettings);
    };
    AdminComponent.prototype.resetPlanets = function () {
        var max = Math.min(this.globalSettings.maxPlanets, 500);
        if (this.planets.length > max) {
            for (var i = max; i < this.planets.length; i++) {
                var planet = this.planets[i];
                this.spaceObjectService.spaceObjects$.remove(planet.$key);
            }
        }
        if (this.planets.length < max) {
            for (var i = this.planets.length; i < max; i++) {
                this.mapService.createPlanet();
            }
        }
    };
    AdminComponent.prototype.resetAsteroids = function () {
        var max = Math.min(this.globalSettings.maxAsteroids, 500);
        if (this.asteroids.length > max) {
            for (var i = max; i < this.asteroids.length; i++) {
                var planet = this.asteroids[i];
                this.spaceObjectService.spaceObjects$.remove(planet.$key);
            }
        }
        if (this.asteroids.length < max) {
            for (var i = this.asteroids.length; i < max; i++) {
                this.mapService.createAsteroid();
            }
        }
    };
    AdminComponent.prototype.resetAIShips = function () {
        var _this = this;
        var max = Math.min(this.globalSettings.maxAIShips, 500);
        if (this.aiShips.length > max) {
            for (var i = max; i < this.aiShips.length; i++) {
                var ship = this.aiShips[i];
                this.spaceObjectService.spaceObjects$.remove(ship.$key);
            }
        }
        this.aiShips.forEach(function (ship) {
            _this.spaceObjectService.spaceObjects$.update(ship.$key, { isControlled: false });
        });
        if (this.aiShips.length < max) {
            for (var i = this.aiShips.length; i < max; i++) {
                this.mapService.createAIShip();
            }
        }
    };
    AdminComponent.prototype.saveArmor = function () {
        this.globalService.saveUpgrade(this.newArmor);
        this.newArmor = new ship_1.Upgrade('', 0, ship_1.UpgradeType.Armor, 10000);
    };
    AdminComponent.prototype.saveDamage = function () {
        this.globalService.saveUpgrade(this.newDamage);
        this.newDamage = new ship_1.Upgrade('', 0, ship_1.UpgradeType.Damage, 10000);
    };
    AdminComponent.prototype.saveRange = function () {
        this.globalService.saveUpgrade(this.newRange);
        this.newRange = new ship_1.Upgrade('', 0, ship_1.UpgradeType.Range, 10000);
    };
    AdminComponent.prototype.removeUpgrade = function (upgradeKey) {
        this.globalService.removeUpgrade(upgradeKey);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AdminComponent.prototype, "model", void 0);
    AdminComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-admin',
            pipes: [shared_2.Upgrades],
            templateUrl: 'admin.component.html',
            styleUrls: ['admin.component.css']
        }), 
        __metadata('design:paramtypes', [shared_1.GlobalService, map_1.MapService, ship_1.SpaceObjectService, shared_2.UserService])
    ], AdminComponent);
    return AdminComponent;
}());
exports.AdminComponent = AdminComponent;
//# sourceMappingURL=admin.component.js.map