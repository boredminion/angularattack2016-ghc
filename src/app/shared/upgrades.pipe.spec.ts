import {
  it,
  describe,
  expect,
  inject,
  beforeEachProviders
} from '@angular/core/testing';
import { Upgrades } from './upgrades.pipe';

describe('Upgrades Pipe', () => {
  beforeEachProviders(() => [Upgrades]);

  it('should transform the input', inject([Upgrades], (pipe: Upgrades) => {
      expect(pipe.transform(true)).toBe(null);
  }));
});
