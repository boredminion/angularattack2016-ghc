"use strict";
var _1 = require('./');
var Planet = (function () {
    function Planet(x, y, image) {
        this.currentScore = 0;
        this.stolenScore = 0;
        this.totalScore = 0;
        this.x = x;
        this.y = y;
        this.type = _1.SpaceObjectType.Planet;
        this.image = image;
    }
    return Planet;
}());
exports.Planet = Planet;
//# sourceMappingURL=planet.class.js.map