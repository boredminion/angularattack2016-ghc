"use strict";
(function (SpaceObjectType) {
    SpaceObjectType[SpaceObjectType["Ship"] = 0] = "Ship";
    SpaceObjectType[SpaceObjectType["Planet"] = 1] = "Planet";
    SpaceObjectType[SpaceObjectType["Explosion"] = 2] = "Explosion";
    SpaceObjectType[SpaceObjectType["Asteroid"] = 3] = "Asteroid";
    SpaceObjectType[SpaceObjectType["AIShip"] = 4] = "AIShip";
})(exports.SpaceObjectType || (exports.SpaceObjectType = {}));
var SpaceObjectType = exports.SpaceObjectType;
//# sourceMappingURL=space-object-type.enum.js.map