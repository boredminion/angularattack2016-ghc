"use strict";
var testing_1 = require('@angular/core/testing');
var online_pipe_1 = require('./online.pipe');
testing_1.describe('Online Pipe', function () {
    testing_1.beforeEachProviders(function () { return [online_pipe_1.Online]; });
    testing_1.it('should transform the input', testing_1.inject([online_pipe_1.Online], function (pipe) {
        testing_1.expect(pipe.transform([])).toBe([]);
    }));
});
//# sourceMappingURL=online.pipe.spec.js.map