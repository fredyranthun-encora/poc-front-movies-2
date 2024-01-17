import { TestBed } from '@angular/core/testing';

import { MovieSearchServiceService } from './movie-search-service.service';

describe('MovieSearchServiceService', () => {
  let service: MovieSearchServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieSearchServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
