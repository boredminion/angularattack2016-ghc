"use strict";
var _1 = require('./');
var Asteroid = (function () {
    function Asteroid(x, y) {
        this.currentScore = 0;
        this.stolenScore = 0;
        this.totalScore = 0;
        this.x = x;
        this.y = y;
        this.type = _1.SpaceObjectType.Asteroid;
        this.image = 'asteroids-240x240.png';
        this.size = Math.ceil(Math.random() * 10);
    }
    return Asteroid;
}());
exports.Asteroid = Asteroid;
//# sourceMappingURL=asteroid.class.js.map