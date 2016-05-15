"use strict";
var _1 = require('./');
var AIShip = (function () {
    function AIShip(x, y, image) {
        this.type = _1.SpaceObjectType.AIShip;
        this.currentScore = 0;
        this.stolenScore = 0;
        this.totalScore = 0;
        this.health = 50;
        this.weaponRange = 0;
        this.weaponDamage = 0;
        this.isControlled = false;
        this.facing = 0;
        this.x = x;
        this.y = y;
        this.image = image;
    }
    return AIShip;
}());
exports.AIShip = AIShip;
//# sourceMappingURL=aiship.class.js.map