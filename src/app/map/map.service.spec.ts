import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { MapService } from './map.service';

describe('Map Service', () => {
  beforeEachProviders(() => [MapService]);

  it('should ...',
      inject([MapService], (service: MapService) => {
    expect(service).toBeTruthy();
  }));
});
