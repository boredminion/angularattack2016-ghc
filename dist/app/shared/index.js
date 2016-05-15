"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var auth_service_1 = require('./auth.service');
exports.AuthService = auth_service_1.AuthService;
var user_service_1 = require('./user.service');
var global_service_1 = require('./global.service');
var notifications_service_1 = require('./notifications.service');
var auth_route_service_1 = require('./auth-route.service');
exports.AuthRouteService = auth_route_service_1.AuthRouteService;
exports.SHARED_PROVIDERS = [global_service_1.GlobalService, auth_service_1.AuthService, user_service_1.UserService, notifications_service_1.NotificationsService];
__export(require('./user.service'));
__export(require('./online.pipe'));
__export(require('./upgrades.pipe'));
__export(require('./global.service'));
var User = (function () {
    function User(shipName, image) {
        this.health = 100;
        this.currentScore = 0;
        this.stolenScore = 0;
        this.totalScore = 0;
        this.weaponRange = 0;
        this.weaponDamage = 0;
        this.admin = false;
        this.upgrades = [];
        this.wanted = false;
        this.bounty = 0;
        this.criminalScore = 0;
        this.shipName = shipName;
        this.image = image;
    }
    return User;
}());
exports.User = User;
__export(require('./notifications.service'));
var user_sort_pipe_1 = require('./user-sort.pipe');
exports.UserSort = user_sort_pipe_1.UserSort;
//# sourceMappingURL=index.js.map