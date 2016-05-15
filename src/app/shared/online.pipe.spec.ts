import {
  it,
  describe,
  expect,
  inject,
  beforeEachProviders
} from '@angular/core/testing';
import { Online } from './online.pipe';

describe('Online Pipe', () => {
  beforeEachProviders(() => [Online]);

  it('should transform the input', inject([Online], (pipe: Online) => {
      expect(pipe.transform([])).toBe([]);
  }));
});
