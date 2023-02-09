import { TestBed } from '@angular/core/testing';

import { SockerwebService } from './sockerweb.service';

describe('SockerwebService', () => {
  let service: SockerwebService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SockerwebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
