"use strict";
var _1 = require('./');
var Explosion = (function () {
    function Explosion(x, y, image, facing) {
        this.currentScore = 0;
        this.stolenScore = 0;
        this.totalScore = 0;
        this.facing = 0;
        this.x = x;
        this.y = y;
        this.type = _1.SpaceObjectType.Explosion;
        this.image = image;
        this.time = Date.now();
        this.facing = facing;
    }
    return Explosion;
}());
exports.Explosion = Explosion;
//# sourceMappingURL=explosion.class.js.map