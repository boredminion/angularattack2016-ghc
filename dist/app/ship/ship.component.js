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
var ShipComponent = (function () {
    function ShipComponent() {
    }
    ShipComponent.prototype.ngOnInit = function () {
    };
    Object.defineProperty(ShipComponent.prototype, "classes", {
        get: function () {
            var facing = this.ship.facing;
            var transitions = this.transitions || '';
            if (facing) {
                return 'facing-' + facing + ' ' + transitions;
            }
            else {
                return transitions;
            }
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ShipComponent.prototype, "ship", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ShipComponent.prototype, "transitions", void 0);
    ShipComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-ship',
            templateUrl: 'ship.component.html',
            styleUrls: ['ship.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], ShipComponent);
    return ShipComponent;
}());
exports.ShipComponent = ShipComponent;
//# sourceMappingURL=ship.component.js.map