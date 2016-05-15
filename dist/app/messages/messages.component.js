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
var shared_1 = require('../shared');
var messages_service_1 = require('./messages.service');
var MessagesComponent = (function () {
    function MessagesComponent(authService, userService, messageService) {
        this.userService = userService;
        this.messageService = messageService;
        this.messageText = '';
    }
    MessagesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.messageService.getMessages();
        this.messageService.limitedMessages$.subscribe(function (messages) {
            _this.messages = [];
            if (messages) {
                for (var i = messages.length - 1; i >= 0; i--) {
                    _this.messages.push(messages[i]);
                }
            }
        });
    };
    MessagesComponent.prototype.sendMessage = function (messageText) {
        this.messageService.sendMessage(messageText);
        this.messageText = '';
    };
    MessagesComponent.prototype.getShipName = function (message) {
        var displayName = this.userService.getShipName(message.uid);
        return displayName ? displayName : message.author;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MessagesComponent.prototype, "model", void 0);
    MessagesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-messages',
            templateUrl: 'messages.component.html',
            styleUrls: ['messages.component.css']
        }), 
        __metadata('design:paramtypes', [shared_1.AuthService, shared_1.UserService, messages_service_1.MessagesService])
    ], MessagesComponent);
    return MessagesComponent;
}());
exports.MessagesComponent = MessagesComponent;
//# sourceMappingURL=messages.component.js.map