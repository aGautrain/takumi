import { TestBed } from '@angular/core/testing';

import { CoinmarketApiService } from './coinmarket-api.service';

describe('CoinmarketApiService', () => {
  let service: CoinmarketApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoinmarketApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
