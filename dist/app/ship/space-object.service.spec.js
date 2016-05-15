"use strict";
var testing_1 = require('@angular/core/testing');
var space_object_service_1 = require('./space-object.service');
testing_1.describe('Object Service', function () {
    testing_1.beforeEachProviders(function () { return [space_object_service_1.SpaceObjectService]; });
    testing_1.it('should ...', testing_1.inject([space_object_service_1.SpaceObjectService], function (service) {
        testing_1.expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=space-object.service.spec.js.map