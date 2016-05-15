"use strict";
var testing_1 = require('@angular/core/testing');
var user_sort_pipe_1 = require('./user-sort.pipe');
testing_1.describe('UserSort Pipe', function () {
    testing_1.beforeEachProviders(function () { return [user_sort_pipe_1.UserSort]; });
    testing_1.it('should transform the input', testing_1.inject([user_sort_pipe_1.UserSort], function (pipe) {
        testing_1.expect(pipe.transform([])).toBe([]);
    }));
});
//# sourceMappingURL=user-sort.pipe.spec.js.map