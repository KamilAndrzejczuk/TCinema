import { TestBed } from '@angular/core/testing';

import { DBConnectionService } from './dbconnection.service';

describe('DBConnectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DBConnectionService = TestBed.get(DBConnectionService);
    expect(service).toBeTruthy();
  });
});
