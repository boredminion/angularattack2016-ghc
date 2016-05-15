"use strict";
var angularfire2_1 = require('angularfire2');
exports.FIREBASE_APP_PROVIDERS = [
    angularfire2_1.FIREBASE_PROVIDERS, angularfire2_1.defaultFirebase('https://angularattack2016-gh.firebaseio.com'),
    angularfire2_1.firebaseAuthConfig({ method: angularfire2_1.AuthMethods.Popup })
];
//# sourceMappingURL=firebase.js.map