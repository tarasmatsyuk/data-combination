import { TestBed } from '@angular/core/testing';

import { PlatformResolverResolver } from './platform-resolver.resolver';

describe('PlatformResolverResolver', () => {
  let resolver: PlatformResolverResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PlatformResolverResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
