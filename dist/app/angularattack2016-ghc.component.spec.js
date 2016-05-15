"use strict";
var testing_1 = require('@angular/core/testing');
var angularattack2016_ghc_component_1 = require('../app/angularattack2016-ghc.component');
testing_1.beforeEachProviders(function () { return [angularattack2016_ghc_component_1.Angularattack2016GhcAppComponent]; });
testing_1.describe('App: Angularattack2016Ghc', function () {
    testing_1.it('should create the app', testing_1.inject([angularattack2016_ghc_component_1.Angularattack2016GhcAppComponent], function (app) {
        testing_1.expect(app).toBeTruthy();
    }));
    testing_1.it('should have as title \'angularattack2016-ghc works!\'', testing_1.inject([angularattack2016_ghc_component_1.Angularattack2016GhcAppComponent], function (app) {
        testing_1.expect(app.title).toEqual('angularattack2016-ghc works!');
    }));
});
//# sourceMappingURL=angularattack2016-ghc.component.spec.js.map