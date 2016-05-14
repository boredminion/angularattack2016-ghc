import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { Angularattack2016GhcAppComponent } from '../app/angularattack2016-ghc.component';

beforeEachProviders(() => [Angularattack2016GhcAppComponent]);

describe('App: Angularattack2016Ghc', () => {
  it('should create the app',
      inject([Angularattack2016GhcAppComponent], (app: Angularattack2016GhcAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'angularattack2016-ghc works!\'',
      inject([Angularattack2016GhcAppComponent], (app: Angularattack2016GhcAppComponent) => {
    expect(app.title).toEqual('angularattack2016-ghc works!');
  }));
});
