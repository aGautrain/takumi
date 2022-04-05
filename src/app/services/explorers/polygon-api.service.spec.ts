import { TestBed } from '@angular/core/testing';

import { PolygonApiService } from './polygon-api.service';

describe('PolygonApiService', () => {
  let service: PolygonApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PolygonApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
