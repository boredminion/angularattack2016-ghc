"use strict";
var router_1 = require('@angular/router');
var auth_service_1 = require('./auth.service');
var appInjector;
/**
 * This is a workaround until `CanActivate` supports DI
 * @see https://github.com/angular/angular/issues/4112
 */
var AuthRouteService = (function () {
    function AuthRouteService() {
    }
    AuthRouteService.dependencies = function () {
        var injector = AuthRouteService.injector();
        var auth = injector.get(auth_service_1.AuthService);
        var router = injector.get(router_1.Router);
        return { auth: auth, router: router };
    };
    AuthRouteService.injector = function (injector) {
        if (injector)
            appInjector = injector;
        return appInjector;
    };
    AuthRouteService.requireAuth = function () {
        var _a = AuthRouteService.dependencies(), auth = _a.auth, router = _a.router;
        if (!auth.authenticated)
            router.navigate(['/']);
        return auth.authenticated;
    };
    AuthRouteService.requireUnauth = function () {
        var _a = AuthRouteService.dependencies(), auth = _a.auth, router = _a.router;
        if (auth.authenticated)
            router.navigate(['/']);
        return !auth.authenticated;
    };
    return AuthRouteService;
}());
exports.AuthRouteService = AuthRouteService;
//# sourceMappingURL=auth-route.service.js.map