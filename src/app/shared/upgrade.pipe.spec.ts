import {
  it,
  describe,
  expect,
  inject,
  beforeEachProviders
} from '@angular/core/testing';
import { Upgrade } from './upgrade.pipe';

describe('Upgrade Pipe', () => {
  beforeEachProviders(() => [Upgrade]);

  it('should transform the input', inject([Upgrade], (pipe: Upgrade) => {
      expect(pipe.transform(true)).toBe(null);
  }));
});
