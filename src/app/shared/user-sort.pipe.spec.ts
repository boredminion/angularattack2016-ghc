import {
  it,
  describe,
  expect,
  inject,
  beforeEachProviders
} from '@angular/core/testing';
import { UserSort } from './user-sort.pipe';

describe('UserSort Pipe', () => {
  beforeEachProviders(() => [UserSort]);

  it('should transform the input', inject([UserSort], (pipe: UserSort) => {
      expect(pipe.transform([])).toBe([]);
  }));
});
