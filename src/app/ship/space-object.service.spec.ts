import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { SpaceObjectService } from './space-object.service';

describe('Object Service', () => {
  beforeEachProviders(() => [SpaceObjectService]);

  it('should ...',
      inject([SpaceObjectService], (service: SpaceObjectService) => {
    expect(service).toBeTruthy();
  }));
});
