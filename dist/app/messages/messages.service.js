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
var angularfire2_1 = require('angularfire2');
var auth_service_1 = require('../shared/auth.service');
var message_1 = require('./message');
var MessagesService = (function () {
    function MessagesService(af, authService) {
        this.af = af;
        this.authService = authService;
    }
    MessagesService.prototype.getMessages = function () {
        this.messages$ = this.af.database.list('/messages');
        this.limitedMessages$ = this.af.database.list('/messages', { query: { limitToLast: 20 } });
    };
    MessagesService.prototype.removeMessages = function () { this.af.database.list("/messages").remove(); };
    MessagesService.prototype.sendMessage = function (text) {
        return this.messages$.push(new message_1.Message(text, this.authService.username, this.authService.id, this.authService.profileLink));
    };
    MessagesService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [angularfire2_1.AngularFire, auth_service_1.AuthService])
    ], MessagesService);
    return MessagesService;
}());
exports.MessagesService = MessagesService;
//# sourceMappingURL=messages.service.js.map