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
var Rx_1 = require('rxjs/Rx');
var Subject_1 = require('rxjs/Subject');
var ship_1 = require('../ship');
var _1 = require('./');
var cell_1 = require('../cell');
var shared_1 = require('../shared');
var Action = (function () {
    function Action(label, action, time) {
        var _this = this;
        this.active = true;
        this.label = label;
        this.action = action;
        this.time = time;
        var interval = setInterval(function () {
            if (_this.time > 0) {
                _this.time--;
            }
            if (_this.active === false) {
                clearInterval(interval);
            }
            if (_this.time === 0 && _this.active === true) {
                _this.time = '';
                _this.action();
                _this.label = '';
                _this.active = false;
                clearInterval(interval);
            }
        }, 1000);
    }
    return Action;
}());
exports.Action = Action;
var MapService = (function () {
    function MapService(userService, spaceObjectService, globalService, notification) {
        var _this = this;
        this.userService = userService;
        this.spaceObjectService = spaceObjectService;
        this.globalService = globalService;
        this.notification = notification;
        this.settings = new shared_1.Settings();
        this.ships = [];
        this.aiShips = [];
        this.fullGrid = [];
        this.visibleGrid = [];
        this.spaceObjects = [];
        this._nextActionSource = new Subject_1.Subject();
        this.nextAction$ = this._nextActionSource.asObservable();
        globalService.upgrades.subscribe(function (upgrades) { return _this.upgrades = upgrades; });
        this.grid$ = new Rx_1.Observable(function (observer) { return _this.gridObserver = observer; }).share();
        this.grid$.subscribe(function (grid) {
            _this.visibleGrid = grid;
        });
        this.transitions$ = new Rx_1.Observable(function (observer) { return _this.transitionsObserver = observer; }).share();
        globalService.globalSettings$.subscribe(function (settings) {
            var _this = this;
            this.settings = settings;
            for (var i = 0; i < this.settings.mapX; i++) {
                this.visibleGrid.push([]);
            }
            for (var i = 0; i < this.settings.mapExtent; i++) {
                this.fullGrid.push([]);
                for (var j = 0; j < this.settings.mapExtent; j++) {
                    this.fullGrid[i][j] = new cell_1.Cell(i, j);
                }
            }
            this.userService.users$.subscribe(function (ships) {
                _this.ships = ships;
                _this.populateGrid();
            });
            this.userService.currentUser.subscribe(function (ship) {
                if (_this.ship && _this.ship.health && _this.ship.health !== ship.health && _this.ship.health > ship.health) {
                    _this.notification.pop('error', 'You were attacked!', 'You just took ' + (_this.ship.health - ship.health) + ' points of damage!');
                }
                _this.ship = ship;
            });
            this.spaceObjectService.spaceObjects$.subscribe(function (objects) {
                _this.spaceObjects = objects;
                _this.fullGrid.forEach(function (row) { return row.forEach(function (cell) { return cell.planet = undefined; }); });
                _this.aiShips = [];
                _this.spaceObjects.forEach(function (spaceObject) {
                    if (spaceObject.type === ship_1.SpaceObjectType.AIShip) {
                        _this.aiShips.push(spaceObject);
                    }
                    if (spaceObject.x) {
                        _this.fullGrid[spaceObject.x][spaceObject.y].planet = spaceObject;
                    }
                    else {
                        spaceObjectService.spaceObjects$.remove(spaceObject.$key);
                    }
                    if (spaceObject.type === ship_1.SpaceObjectType.Explosion && spaceObject.time && Date.now() - spaceObject.time > 1000) {
                        setTimeout(function () {
                            spaceObjectService.spaceObjects$.remove(spaceObject.$key);
                        }, 1000);
                    }
                });
            });
        }.bind(this));
        this.nextAction$.subscribe(function (action) {
            _this.currentAction = action;
        });
        setInterval(function () { return _this.aiAction(); }, 1000);
    }
    MapService.prototype.aiAction = function () {
        var _this = this;
        var ship = this.aiShips[Math.floor(Math.random() * this.aiShips.length)];
        if (ship && !ship.isControlled) {
            this.spaceObjectService.spaceObjects$.update(ship.$key, { isControlled: true }).then(function () {
                var order = Math.floor(Math.random() * 4);
                switch (order) {
                    case 0:
                        //move
                        _this.moveForward(ship);
                        break;
                    case 1:
                        //port
                        _this.rotateLeft(ship);
                        break;
                    case 2:
                        //stb
                        _this.rotateRight(ship);
                        break;
                    case 3:
                        _this.pewPew(ship);
                        break;
                }
                setTimeout(function () { return _this.spaceObjectService.spaceObjects$.update(ship.$key, { isControlled: false }); }, 2000);
            });
        }
    };
    MapService.prototype.createAIShip = function () {
        var planetX = Math.floor(Math.random() * this.settings.mapExtent);
        var planetY = Math.floor(Math.random() * this.settings.mapExtent);
        if (!this.fullGrid[planetX][planetY].contents) {
            this.spaceObjectService.createAIShip(planetX, planetY);
        }
    };
    MapService.prototype.createAsteroid = function () {
        var planetX = Math.floor(Math.random() * this.settings.mapExtent);
        var planetY = Math.floor(Math.random() * this.settings.mapExtent);
        if (!this.fullGrid[planetX][planetY].planet) {
            this.spaceObjectService.createAsteroid(planetX, planetY);
        }
    };
    MapService.prototype.createPlanet = function () {
        var planetX = Math.floor(Math.random() * this.settings.mapExtent);
        var planetY = Math.floor(Math.random() * this.settings.mapExtent);
        if (!this.fullGrid[planetX][planetY].planet) {
            this.spaceObjectService.createPlanet(planetX, planetY, null);
        }
    };
    MapService.prototype.doAnimations = function (facing) {
        var _this = this;
        var animation;
        switch (facing) {
            case _1.Direction.Coreward:
                animation = 'coreward';
                break;
            case _1.Direction.Trailing:
                animation = 'trailing';
                break;
            case _1.Direction.Rimward:
                animation = 'rimward';
                break;
            case _1.Direction.Spinward:
                animation = 'spinward';
                break;
        }
        this.transitionsObserver.next(animation);
        setTimeout(function () { return _this.transitionsObserver.next(null); }, 1000);
    };
    MapService.prototype.pewPew = function (aiShip) {
        var _this = this;
        var shootingShip = aiShip || this.ship;
        var weaponRange = this.settings.baseWeaponRange;
        var weaponDamage = this.settings.baseWeaponDamage;
        var shipHealth = this.settings.baseShipHealth;
        if (!aiShip && this.ship.upgrades) {
            var shipUpgrades = Object.keys(this.ship.upgrades).map(function (key) {
                return _this.ship.upgrades[key];
            });
            shipUpgrades = shipUpgrades.map(function (key) {
                return _this.upgrades.find(function (upgrade) {
                    return upgrade.$key === key;
                });
            });
            shipUpgrades.forEach(function (upgrade) {
                if (upgrade.type === ship_1.UpgradeType.Range) {
                    weaponRange += upgrade.value;
                }
                if (upgrade.type === ship_1.UpgradeType.Damage) {
                    weaponDamage += upgrade.value;
                }
                if (upgrade.type === ship_1.UpgradeType.Armor) {
                    shipHealth += upgrade.value;
                }
            });
        }
        var _loop_1 = function(i) {
            var x = 0;
            var y = 0;
            switch (shootingShip.facing) {
                case 0:
                    x = this_1.wraparound(shootingShip.x - i, this_1.settings.mapExtent);
                    y = (shootingShip.y);
                    break;
                case 1:
                    x = (shootingShip.x);
                    y = this_1.wraparound(shootingShip.y + i, this_1.settings.mapExtent);
                    break;
                case 2:
                    x = this_1.wraparound(shootingShip.x + i, this_1.settings.mapExtent);
                    y = (shootingShip.y);
                    break;
                case 3:
                    x = (shootingShip.x);
                    y = this_1.wraparound(shootingShip.y - i, this_1.settings.mapExtent);
                    break;
            }
            var hit = false;
            this_1.ships.forEach(function (ship) {
                if (ship.x === x && ship.y === y) {
                    ship.currentScore = ship.currentScore - weaponDamage > 0 ? ship.currentScore - weaponDamage : 0;
                    ship.stolenScore = ship.stolenScore ? ship.stolenScore + weaponDamage : weaponDamage;
                    ship.health = ship.health ? ship.health - weaponDamage : shipHealth - weaponDamage;
                    if (!aiShip) {
                        this.ship.criminalScore = ship.health <= 0 && ship.wanted ? this.ship.criminalScore + 1 : this.ship.criminalScore;
                        this.ship.wanted = ship.wanted ? this.ship.wanted : true;
                        this.ship.bounty = ship.wanted ? (this.ship.bounty ? this.ship.bounty : this.settings.bounty) : (this.ship.bounty ? this.ship.bounty : this.settings.bounty) + this.settings.bounty;
                        this.ship.currentScore = ship.health <= 0 && ship.wanted ? this.ship.currentScore + weaponDamage + ship.bounty : this.ship.currentScore + weaponDamage;
                        this.ship.totalScore = ship.health <= 0 && ship.wanted ? this.ship.totalScore + weaponDamage + ship.bounty : this.ship.totalScore + weaponDamage;
                        this.userService.scoreOwnShip(this.ship);
                        this.userService.scoreShip(ship);
                    }
                    hit = true;
                    if (!aiShip) {
                        this.notification.pop('success', 'Hit!', 'You hit ' + ship.shipName + ' for ' + weaponDamage + ' points!');
                    }
                    this.spaceObjectService.createBoom(x, y, true, ship.facing);
                }
            }.bind(this_1));
            if (!hit) {
                this_1.spaceObjects.forEach(function (object) {
                    if (object.type === ship_1.SpaceObjectType.AIShip) {
                        var ship = object;
                        if (ship.x === x && ship.y === y) {
                            ship.health = ship.health ? ship.health - weaponDamage : shipHealth - weaponDamage;
                            if (!aiShip) {
                                this.ship.currentScore = this.ship.currentScore + weaponDamage;
                                this.ship.totalScore = this.ship.totalScore + weaponDamage;
                                this.userService.scoreOwnShip(this.ship);
                            }
                            this.spaceObjectService.damage(ship);
                            hit = true;
                            if (!aiShip) {
                                this.notification.pop('success', 'Hit!', 'You hit a drone for ' + weaponDamage + ' points!');
                            }
                            this.spaceObjectService.createBoom(x, y, true, ship.facing);
                        }
                    }
                }.bind(this_1));
            }
            if (!hit) {
                this_1.spaceObjectService.createBoom(x, y, false, 0);
            }
        };
        var this_1 = this;
        for (var i = 1; i <= weaponRange; i++) {
            _loop_1(i);
        }
    };
    MapService.prototype.collisionCheck = function (x, y) {
        var collide = false;
        this.ships.forEach(function (ship) {
            if (ship.x === x && ship.y === y && ship.$key !== this.ship.$key) {
                collide = true;
            }
        }.bind(this));
        this.aiShips.forEach(function (ship) {
            if (ship.x === x && ship.y === y && ship.$key !== this.ship.$key) {
                collide = true;
            }
        }.bind(this));
        return collide;
    };
    MapService.prototype.forwardCell = function (ship) {
        switch (ship.facing) {
            case 0:
                return [this.wraparound(ship.x - 1, this.settings.mapExtent), (ship.y)];
            case 1:
                return [(ship.x), this.wraparound(ship.y + 1, this.settings.mapExtent)];
            case 2:
                return [this.wraparound(ship.x + 1, this.settings.mapExtent), (ship.y)];
            case 3:
                return [(ship.x), this.wraparound(ship.y - 1, this.settings.mapExtent)];
        }
    };
    MapService.prototype.moveForward = function (ship) {
        var movingShip = ship || this.ship;
        var move = this.forwardCell(movingShip);
        if (this.collisionCheck(move[0], move[1])) {
            return;
        }
        movingShip.x = move[0];
        movingShip.y = move[1];
        movingShip.x = this.wraparound(movingShip.x, this.settings.mapExtent);
        movingShip.y = this.wraparound(movingShip.y, this.settings.mapExtent);
        this.populateGrid();
        if (!ship) {
            this.doAnimations(movingShip.facing);
        }
        this.updateShip(movingShip, !!ship);
    };
    MapService.prototype.rotateRight = function (ship) {
        var turningShip = ship || this.ship;
        var oldFacing = turningShip.facing;
        if (turningShip.facing < 3) {
            turningShip.facing++;
        }
        else {
            turningShip.facing = 0;
        }
        this.updateShip(turningShip, !!ship);
    };
    MapService.prototype.rotateLeft = function (ship) {
        var turningShip = ship || this.ship;
        var oldFacing = turningShip.facing;
        if (turningShip.facing) {
            turningShip.facing--;
        }
        else {
            turningShip.facing = 3;
        }
        this.updateShip(turningShip, !!ship);
    };
    MapService.prototype.updateShip = function (ship, isAi) {
        if (isAi) {
            this.spaceObjectService.spaceObjects$.update(ship.$key, {
                x: ship.x,
                y: ship.y,
                facing: ship.facing
            });
        }
        else {
            this.userService.moveShip(ship);
        }
    };
    MapService.prototype.mine = function () {
        var asteroid = this.fullGrid[this.ship.x][this.ship.y].planet;
        if (asteroid && asteroid.type === ship_1.SpaceObjectType.Asteroid) {
            asteroid.size--;
            this.ship.currentScore++;
            this.ship.totalScore++;
            this.userService.scoreOwnShip(this.ship);
            if (asteroid.size) {
                this.spaceObjectService.spaceObjects$.update(asteroid.$key, { size: asteroid.size });
                this.notification.pop('success', 'Mining', 'You have mined valuable resources and increased your score.');
            }
            else {
                this.spaceObjectService.spaceObjects$.remove(asteroid.$key);
                this.notification.pop('success', 'Mining', 'You have mined valuable resources and increased your score. This asteroid is now depleted.');
            }
        }
        else {
            this.notification.pop('error', 'Mining', 'You can only mine asteroids.');
        }
    };
    MapService.prototype.trade = function () {
        var planet = this.fullGrid[this.ship.x][this.ship.y].planet;
        if (planet) {
            if (this.tradeMission) {
                var x = Math.abs(this.tradeMission.x - this.ship.x);
                var y = Math.abs(this.tradeMission.y - this.ship.y);
                if (x > 50) {
                    x = x - 50;
                }
                if (y > 50) {
                    y = y - 50;
                }
                var score = (x + y) / 2;
                if (score) {
                    this.ship.currentScore += score;
                    this.ship.totalScore += score;
                    this.userService.scoreOwnShip(this.ship);
                    this.notification.pop('success', 'Trade', 'You have sold your goods for a profit and earned ' + score + ' points!');
                }
                else {
                    this.notification.pop('info', 'Trade', 'You decide not to carry any cargo.');
                }
                this.tradeMission = undefined;
            }
            else {
                this.tradeMission = { x: this.ship.x, y: this.ship.y };
                this.notification.pop('success', 'Trade', 'You load your ship with cargo. You will earn more points the farther you take it.');
            }
        }
        else {
            this.notification.pop('error', 'Trade', 'You can only conduct trade missions at planets.');
        }
    };
    MapService.prototype.actionMoveForward = function () {
        if (this.currentAction && this.currentAction.label !== 'Move Forward') {
            this.currentAction.active = false;
        }
        if (!this.currentAction || (this.currentAction && this.currentAction.label !== 'Move Forward')) {
            this._nextActionSource.next(new Action('Move Forward', this.moveForward.bind(this), this.settings.actionDelay));
        }
    };
    MapService.prototype.actionRotateLeft = function () {
        if (this.currentAction && this.currentAction.label !== 'Rotate Left') {
            this.currentAction.active = false;
        }
        if (!this.currentAction || (this.currentAction && this.currentAction.label !== 'Rotate Left')) {
            this._nextActionSource.next(new Action('Rotate Left', this.rotateLeft.bind(this), this.settings.actionDelay));
        }
    };
    MapService.prototype.actionRotateRight = function () {
        if (this.currentAction && this.currentAction.label !== 'Rotate Right') {
            this.currentAction.active = false;
        }
        if (!this.currentAction || (this.currentAction && this.currentAction.label !== 'Rotate Right')) {
            this._nextActionSource.next(new Action('Rotate Right', this.rotateRight.bind(this), this.settings.actionDelay));
        }
    };
    MapService.prototype.actionFireWeapon = function () {
        if (this.currentAction && this.currentAction.label !== 'Fire') {
            this.currentAction.active = false;
        }
        if (!this.currentAction || (this.currentAction && this.currentAction.label !== 'Fire')) {
            this._nextActionSource.next(new Action('Fire', this.pewPew.bind(this), this.settings.actionDelay));
        }
    };
    MapService.prototype.actionMine = function () {
        if (this.currentAction && this.currentAction.label !== 'Mine') {
            this.currentAction.active = false;
        }
        if (!this.currentAction || (this.currentAction && this.currentAction.label !== 'Mine')) {
            this._nextActionSource.next(new Action('Mine', this.mine.bind(this), this.settings.actionDelay));
        }
    };
    MapService.prototype.actionTrade = function () {
        if (this.currentAction && this.currentAction.label !== 'Trade') {
            this.currentAction.active = false;
        }
        if (!this.currentAction || (this.currentAction && this.currentAction.label !== 'Trade')) {
            this._nextActionSource.next(new Action('Trade', this.trade.bind(this), this.settings.actionDelay));
        }
    };
    MapService.prototype.keyAction = function (event) {
        if (event.keyCode === 32) {
            this.actionFireWeapon();
        }
        if (event.keyCode === 38 || event.keyCode === 87) {
            this.actionMoveForward();
        }
        if (event.keyCode === 36 || event.keyCode === 81) {
            this.actionRotateLeft();
        }
        if (event.keyCode === 33 || event.keyCode === 69) {
            this.actionRotateRight();
        }
    };
    MapService.prototype.populateGrid = function () {
        var _this = this;
        this.ships.forEach(function (ship) {
            if (ship.online) {
                var shipKeys = Object.keys(ship);
                if (shipKeys.indexOf('x') > -1 && shipKeys.indexOf('y') > -1) {
                    if (_this.fullGrid[ship.x][ship.y].contents !== null) {
                        var gridShip = _this.fullGrid[ship.x][ship.y].contents;
                        if (gridShip && gridShip.x === ship.x && gridShip.y === ship.y && gridShip.facing === ship.facing && gridShip.$key === ship.$key) {
                        }
                        else {
                            if (gridShip && gridShip.x === ship.x && gridShip.y === ship.y) {
                                // ship may be rotating
                                _this.fullGrid[ship.x][ship.y].contents = ship;
                            }
                            else {
                                _this.fullGrid[ship.x][ship.y].contents = ship;
                                _this.fullGrid[ship.lastX][ship.lastY].contents = null;
                            }
                        }
                    }
                    else {
                        // ship moved into an empty space
                        if (shipKeys.indexOf('lastX') > -1 && shipKeys.indexOf('lastY') > -1) {
                            if (_this.fullGrid[ship.lastX][ship.lastY].contents && _this.fullGrid[ship.lastX][ship.lastY].contents.$key === ship.$key) {
                                _this.fullGrid[ship.lastX][ship.lastY].contents = null;
                            }
                        }
                        _this.fullGrid[ship.x][ship.y].contents = ship;
                    }
                }
            }
        });
        if (this.ship) {
            var visibleX = this.ship.x + 1 - Math.floor(this.settings.mapX / 2);
            var visibleY = this.ship.y + 1 - Math.floor(this.settings.mapY / 2);
            for (var i = 0; i < this.settings.mapX; i++) {
                for (var j = 0; j < this.settings.mapY; j++) {
                    var gridX = this.wraparound(i + visibleX, this.settings.mapExtent);
                    var gridY = this.wraparound(j + visibleY, this.settings.mapExtent);
                    this.visibleGrid[i][j] = this.fullGrid[gridX][gridY];
                }
            }
            this.gridObserver.next(this.visibleGrid);
        }
    };
    MapService.prototype.wraparound = function (value, limit) {
        if (value >= limit) {
            return this.wraparound(value - limit, limit);
        }
        if (value < 0) {
            return this.wraparound(limit + value, limit);
        }
        return value;
    };
    MapService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [shared_1.UserService, ship_1.SpaceObjectService, shared_1.GlobalService, shared_1.NotificationsService])
    ], MapService);
    return MapService;
}());
exports.MapService = MapService;
//# sourceMappingURL=map.service.js.map