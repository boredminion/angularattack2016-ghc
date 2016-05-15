"use strict";
var testing_1 = require('@angular/core/testing');
var messages_service_1 = require('./messages.service');
testing_1.describe('Messages Service', function () {
    testing_1.beforeEachProviders(function () { return [messages_service_1.MessagesService]; });
    testing_1.it('should ...', testing_1.inject([messages_service_1.MessagesService], function (service) { testing_1.expect(service).toBeTruthy(); }));
});
//# sourceMappingURL=messages.service.spec.js.map