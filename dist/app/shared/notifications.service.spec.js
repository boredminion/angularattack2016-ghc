"use strict";
var testing_1 = require('@angular/core/testing');
var notifications_service_1 = require('./notifications.service');
testing_1.describe('Notifications Service', function () {
    testing_1.beforeEachProviders(function () { return [notifications_service_1.NotificationsService]; });
    testing_1.it('should ...', testing_1.inject([notifications_service_1.NotificationsService], function (service) {
        testing_1.expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=notifications.service.spec.js.map