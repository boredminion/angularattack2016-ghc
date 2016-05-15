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
var bodyOutputType_1 = require('./bodyOutputType');
var ToastComponent = (function () {
    function ToastComponent(resolver) {
        this.resolver = resolver;
        this.bodyOutputType = bodyOutputType_1.BodyOutputType;
        this.clickEvent = new core_1.EventEmitter();
    }
    ToastComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.toast.bodyOutputType === this.bodyOutputType.Component) {
            this.resolver.resolveComponent(this.toast.body).then(function (factory) {
                _this.componentBody.createComponent(factory, 0, _this.componentBody.injector);
            });
        }
    };
    ToastComponent.prototype.click = function (toast) {
        this.clickEvent.emit({
            value: { toast: toast, isCloseButton: true }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ToastComponent.prototype, "toast", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ToastComponent.prototype, "iconClass", void 0);
    __decorate([
        core_1.ViewChild('componentBody', { read: core_1.ViewContainerRef }), 
        __metadata('design:type', core_1.ViewContainerRef)
    ], ToastComponent.prototype, "componentBody", void 0);
    ToastComponent = __decorate([
        core_1.Component({
            selector: '[toastComp]',
            template: "\n        <div *ngIf=\"toast.showCloseButton\" (click)=\"click(toast)\" [innerHTML]=\"toast.closeHtml\"></div>\n        <i class=\"toaster-icon\" [ngClass]=\"iconClass\"></i>\n        <div [ngClass]=\"toast.toasterConfig.titleClass\">{{toast.title}}</div>\n        <div [ngClass]=\"toast.toasterConfig.messageClass\" [ngSwitch]=\"toast.bodyOutputType\">\n            <div *ngSwitchWhen=\"bodyOutputType.Component\" #componentBody></div> \n            <div *ngSwitchWhen=\"bodyOutputType.TrustedHtml\" [innerHTML]=\"toast.html\"></div>\n            <div *ngSwitchWhen=\"bodyOutputType.Default\">{{toast.body}}</div>\n        </div>",
            outputs: ['clickEvent']
        }), 
        __metadata('design:paramtypes', [core_1.ComponentResolver])
    ], ToastComponent);
    return ToastComponent;
}());
exports.ToastComponent = ToastComponent;
//# sourceMappingURL=toast.component.js.map