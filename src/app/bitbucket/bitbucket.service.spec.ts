import { TestBed } from '@angular/core/testing';

import { BitbucketService } from './bitbucket.service';

describe('BitbucketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BitbucketService = TestBed.get(BitbucketService);
    expect(service).toBeTruthy();
  });
});
