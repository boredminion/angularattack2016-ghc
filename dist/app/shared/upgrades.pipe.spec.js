"use strict";
var testing_1 = require('@angular/core/testing');
var upgrades_pipe_1 = require('./upgrades.pipe');
testing_1.describe('Upgrades Pipe', function () {
    testing_1.beforeEachProviders(function () { return [upgrades_pipe_1.Upgrades]; });
    testing_1.it('should transform the input', testing_1.inject([upgrades_pipe_1.Upgrades], function (pipe) {
        testing_1.expect(pipe.transform(null)).toBe(null);
    }));
});
//# sourceMappingURL=upgrades.pipe.spec.js.map