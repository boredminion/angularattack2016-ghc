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
var router_1 = require('@angular/router');
var cell_1 = require('../cell');
var sidebar_1 = require('../sidebar');
var shared_1 = require('../shared');
var map_service_1 = require('./map.service');
var MapComponent = (function () {
    function MapComponent(authService, router, mapService) {
        var _this = this;
        this.authService = authService;
        this.router = router;
        this.mapService = mapService;
        this.grid = [];
        mapService.grid$.subscribe(function (grid) { return _this.grid = grid; });
        mapService.transitions$.subscribe(function (transitions) { return _this.transitions = transitions; });
    }
    MapComponent.prototype.routerOnActivate = function () {
        if (!this.authService.authenticated) {
            return this.router.navigate(['/']);
        }
        this.mapService.populateGrid();
    };
    MapComponent = __decorate([
        core_1.Component({
            directives: [cell_1.CellComponent, sidebar_1.SidebarComponent],
            moduleId: module.id,
            selector: 'app-map',
            templateUrl: 'map.component.html',
            styleUrls: ['map.component.css']
        }), 
        __metadata('design:paramtypes', [shared_1.AuthService, router_1.Router, map_service_1.MapService])
    ], MapComponent);
    return MapComponent;
}());
exports.MapComponent = MapComponent;
//# sourceMappingURL=map.component.js.map