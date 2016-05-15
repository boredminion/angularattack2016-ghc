/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
var map = {
    firebase: 'vendor/firebase/lib/firebase-web.js',
    angularfire2: 'vendor/angularfire2',
    'ng2-bootstrap': 'vendor/ng2-bootstrap/ng2-bootstrap.js',
    'angular2-toaster': 'vendor/angular2-toaster'
};
/** User packages configuration. */
var packages = {
    angularfire2: { defaultExtension: 'js', main: 'angularfire2.js' },
    'vendor/ng2-bootstrap': {
        defaultExtension: 'js',
    }
};
////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
var barrels = [
    // Angular specific barrels.
    '@angular/core', '@angular/common', '@angular/compiler', '@angular/http', '@angular/router',
    '@angular/platform-browser', '@angular/platform-browser-dynamic',
    // Thirdparty barrels.
    'rxjs',
    // App specific barrels.
    'app', 'app/shared', 'app/navbar', 'app/welcome', 'app/users', 'app/messages', 'app/map',
    'app/cell',
    'app/ship',
    'app/scores',
    'app/shipyard',
    'app/admin',
    'app/users',
    'app/sidebar',
    'app/intro',
    'app/controls',
];
var cliSystemConfigPackages = {};
barrels.forEach(function (barrelName) { cliSystemConfigPackages[barrelName] = { main: 'index' }; });
// Apply the CLI SystemJS configuration.
System.config({
    defaultJSExtensions: true,
    map: { '@angular': 'vendor/@angular', 'rxjs': 'vendor/rxjs', 'main': 'main.js' },
    packages: cliSystemConfigPackages
});
// Apply the user's configuration.
System.config({ map: map, packages: packages });
//# sourceMappingURL=system-config.js.map