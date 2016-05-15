"use strict";
var testing_1 = require('@angular/core/testing');
var auth_service_1 = require('./auth.service');
testing_1.describe('Auth Service', function () {
    testing_1.beforeEachProviders(function () { return [auth_service_1.AuthService]; });
    testing_1.it('should ...', testing_1.inject([auth_service_1.AuthService], function (service) { testing_1.expect(service).toBeTruthy(); }));
});
//# sourceMappingURL=auth.service.spec.js.map