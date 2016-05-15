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
var _1 = require('./');
var shared_1 = require('../shared');
var SpaceObjectService = (function () {
    function SpaceObjectService(authService, af) {
        var _this = this;
        this.authService = authService;
        this.af = af;
        this.spaceObjects = [];
        this.SHIP_IMAGES = [
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
        this.PLANET_IMAGES = [
            'callisto-240x240.png',
            'earth30-240x240.png',
            'europa-240x240.png',
            'jupiter5-240x218.png',
            'jupiter6-240x231.png',
            'mars3-240x240.png',
            'mars5-240x236.png',
            'mars6-240x240.png',
            'moon17-240x236.png',
            'moon18.png',
            'neptune4-240x221.png',
            'planet5-240x233.png',
            'planet6.png',
            'planet9-240x223.png',
            'planet10-240x240.png',
            'planet12-240x240.png',
            'planet13-240x238.png',
            'saturn3-240x114.png',
            'saturn5-300x124.png'
        ];
        this.boomDuration = 2000;
        this.spaceObjects$ = this.af.database.list('/space-objects');
        this.spaceObjects$.subscribe(function (objects) {
            _this.spaceObjects = objects;
        });
    }
    SpaceObjectService.prototype.createAIShip = function (x, y) {
        this.registerObject(new _1.AIShip(x, y, this.SHIP_IMAGES[Math.floor(Math.random() * this.SHIP_IMAGES.length)]));
    };
    SpaceObjectService.prototype.createAsteroid = function (x, y) {
        this.registerObject(new _1.Asteroid(x, y));
    };
    SpaceObjectService.prototype.createPlanet = function (x, y, image) {
        if (!image) {
            image = this.PLANET_IMAGES[Math.floor(Math.random() * this.PLANET_IMAGES.length)];
        }
        this.registerObject(new _1.Planet(x, y, image));
    };
    SpaceObjectService.prototype.createBoom = function (x, y, hit, facing) {
        var _this = this;
        var image = 'fireworks6-150x150.png';
        if (hit) {
            image = 'explosion5-150x150.png';
        }
        this.registerObject(new _1.Explosion(x, y, image, facing)).then(function (boom) {
            setTimeout(function () {
                _this.spaceObjects$.remove(boom.path.u[1]);
            }, _this.boomDuration);
        });
    };
    SpaceObjectService.prototype.registerObject = function (obj) {
        return this.spaceObjects$.push(obj);
    };
    SpaceObjectService.prototype.registerShip = function (ship) {
        if (!ship.$key) {
            return this.spaceObjects$.push(ship);
        }
    };
    SpaceObjectService.prototype.damage = function (ship) {
        if (ship.health > 0) {
            this.spaceObjects$.update(ship.$key, {
                health: ship.health
            });
        }
        else {
            this.spaceObjects$.remove(ship.$key);
        }
    };
    SpaceObjectService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [shared_1.AuthService, angularfire2_1.AngularFire])
    ], SpaceObjectService);
    return SpaceObjectService;
}());
exports.SpaceObjectService = SpaceObjectService;
//# sourceMappingURL=space-object.service.js.map