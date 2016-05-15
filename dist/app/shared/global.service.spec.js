"use strict";
var testing_1 = require('@angular/core/testing');
var global_service_1 = require('./global.service');
testing_1.describe('Global Service', function () {
    testing_1.beforeEachProviders(function () { return [global_service_1.GlobalService]; });
    testing_1.it('should ...', testing_1.inject([global_service_1.GlobalService], function (service) {
        testing_1.expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=global.service.spec.js.map