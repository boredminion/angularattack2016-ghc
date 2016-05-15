import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { GlobalService } from './global.service';

describe('Global Service', () => {
  beforeEachProviders(() => [GlobalService]);

  it('should ...',
      inject([GlobalService], (service: GlobalService) => {
    expect(service).toBeTruthy();
  }));
});
