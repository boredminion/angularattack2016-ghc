/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  firebase: 'vendor/firebase/lib/firebase-web.js',
  angularfire2: 'vendor/angularfire2',
  'ng2-bootstrap': 'vendor/ng2-bootstrap/ng2-bootstrap.js'
};

/** User packages configuration. */
const packages: any = {
  angularfire2: {defaultExtension: 'js', main: 'angularfire2.js'},
  'vendor/ng2-bootstrap': {
    defaultExtension: 'js',
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
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
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => { cliSystemConfigPackages[barrelName] = {main: 'index'}; });

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {'@angular': 'vendor/@angular', 'rxjs': 'vendor/rxjs', 'main': 'main.js'},
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({map, packages});
