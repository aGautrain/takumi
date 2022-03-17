import { TestBed } from '@angular/core/testing';

import { OwlracleApiService } from './owlracle-api.service';

describe('OwlracleApiService', () => {
  let service: OwlracleApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwlracleApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
