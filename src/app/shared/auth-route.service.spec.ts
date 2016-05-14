import {beforeEachProviders, it, describe, expect, inject} from '@angular/core/testing';
import {AuthRouteService} from './auth-route.service';

describe('AuthRoute Service', () => {
  beforeEachProviders(() => [AuthRouteService]);

  it('should ...',
     inject([AuthRouteService], (service: AuthRouteService) => { expect(service).toBeTruthy(); }));
});
