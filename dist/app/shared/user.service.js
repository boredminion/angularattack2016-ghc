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
require('rxjs/add/operator/map');
require('rxjs/add/operator/share');
var core_1 = require('@angular/core');
var angularfire2_1 = require('angularfire2');
var _1 = require('./');
var ship_1 = require('../ship');
var global_service_1 = require('./global.service');
var UserService = (function () {
    function UserService(globalService, af, auth, ref) {
        var _this = this;
        this.globalService = globalService;
        this.users = [];
        this.af = af;
        this.users$ = af.database.list("/users");
        this.users$.subscribe(function (data) { _this.users = data; }, function (err) { return console.log(err); }, function () { return console.log('done'); });
        this.auth = auth;
        this.currentUser = this.af.database.object("/users/" + this.auth.id);
        this.upgrades$ = this.af.database.list("/users/" + this.auth.id + "/upgrades");
        this.currentUser.subscribe(function (user) {
            _this.ship = user;
        });
        this.online = af.database.list('/users/' + this.auth.id + '/online');
        this.onlineRef = ref.child("/users/" + this.auth.id + "/online");
        var connectedRef = ref.child('/.info/connected');
        this.connected = this.af.database.object("/.info/connected");
        this.connected.subscribe(function (data) {
            if (data === true) {
                _this.setOnline();
            }
        }, function (err) { return console.error(err); }, function () { return console.log('done'); });
    }
    UserService.prototype.setOnline = function () {
        this.onlineItemRef = this.onlineRef.child('1');
        this.onlineItemRef.onDisconnect().remove();
        this.onlineItemRef.set(true);
    };
    UserService.prototype.setOffline = function () { this.onlineItemRef.remove(); };
    UserService.prototype.getUser = function (uid) { return this.af.database.object("/users/" + uid); };
    UserService.prototype.getUsers = function () {
        return;
    };
    UserService.prototype.getShipName = function (uid) {
        var user = this.users.find(function (user) { return user.$key === uid; });
        return user ? user.shipName : null;
    };
    UserService.prototype.moveShip = function (ship) {
        return this.currentUser.update({
            facing: ship.facing,
            lastX: this.ship.x,
            lastY: this.ship.y,
            x: ship.x,
            y: ship.y
        });
    };
    UserService.prototype.scoreOwnShip = function (ship) {
        return this.currentUser.update({
            wanted: ship.wanted ? ship.wanted : false,
            bounty: ship.bounty ? ship.bounty : 0,
            criminalScore: ship.criminalScore ? ship.criminalScore : 0,
            currentScore: ship.currentScore ? ship.currentScore : 0,
            stolenScore: ship.stolenScore ? ship.stolenScore : 0,
            totalScore: ship.totalScore ? ship.totalScore : 0
        });
    };
    UserService.prototype.scoreShip = function (ship) {
        var newX = Math.floor(Math.random() * this.globalService.globalSettings.mapExtent);
        var newY = Math.floor(Math.random() * this.globalService.globalSettings.mapExtent);
        var randomLocation = false;
        while (this.users.filter(function (user) {
            return user.x === newX && user.y === newY;
        }).length > 0) {
            newX = Math.floor(Math.random() * this.globalService.globalSettings.mapExtent);
            newY = Math.floor(Math.random() * this.globalService.globalSettings.mapExtent);
        }
        if (ship.health <= 0) {
            return this.users$.update(ship.$key, {
                facing: ship.facing,
                lastX: ship.x,
                lastY: ship.y,
                x: newX,
                y: newY,
                currentScore: ship.currentScore ? ship.currentScore : 0,
                stolenScore: ship.stolenScore ? ship.stolenScore : 0,
                totalScore: ship.totalScore ? ship.totalScore : 0,
                health: this.globalService.globalSettings.baseShipHealth,
                upgrades: [],
                wanted: false,
                bounty: 0,
                criminalScore: ship.criminalScore ? ship.criminalScore : 0
            });
        }
        else {
            return this.users$.update(ship.$key, {
                currentScore: ship.currentScore ? ship.currentScore : 0,
                stolenScore: ship.stolenScore ? ship.stolenScore : 0,
                totalScore: ship.totalScore ? ship.totalScore : 0,
                health: ship.health ? ship.health : this.globalService.globalSettings.baseShipHealth
            });
        }
    };
    UserService.prototype.buyUpgrade = function (upgrade) {
        this.upgrades$.push(upgrade.$key);
        this.currentUser.update({
            currentScore: this.ship.currentScore - upgrade.cost,
            health: upgrade.type === ship_1.UpgradeType.Armor ? this.ship.health += upgrade.value : this.ship.health
        });
    };
    UserService.prototype.setShipName = function (newShipName, image, x, y, facing) {
        var currentUser = new _1.User(newShipName || this.auth.username, image || 'spaceship14-240x185.png');
        var newX = Math.floor(Math.random() * this.globalService.globalSettings.mapExtent);
        var newY = Math.floor(Math.random() * this.globalService.globalSettings.mapExtent);
        var randomLocation = false;
        while (this.users.filter(function (user) {
            return user.x === newX && user.y === newY;
        }).length > 0) {
            newX = Math.floor(Math.random() * this.globalService.globalSettings.mapExtent);
            newY = Math.floor(Math.random() * this.globalService.globalSettings.mapExtent);
        }
        if (x === null && y === null) {
            currentUser.x = newX;
            currentUser.y = newY;
        }
        else {
            currentUser.x = x;
            currentUser.y = y;
        }
        if (facing === null) {
            currentUser.facing = 0;
        }
        else {
            currentUser.facing = facing;
        }
        this.af.database.object("/users/" + this.auth.id).set(currentUser);
        window.location.replace('/map');
    };
    UserService = __decorate([
        core_1.Injectable(),
        __param(3, core_1.Inject(angularfire2_1.FirebaseRef)), 
        __metadata('design:paramtypes', [global_service_1.GlobalService, angularfire2_1.AngularFire, _1.AuthService, Firebase])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map