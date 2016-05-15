"use strict";
var Upgrade = (function () {
    function Upgrade(name, value, type, cost) {
        this.name = name || '';
        this.value = value || 0;
        this.type = type;
        this.cost = cost || 100000000;
    }
    return Upgrade;
}());
exports.Upgrade = Upgrade;
//# sourceMappingURL=upgrade.class.js.map