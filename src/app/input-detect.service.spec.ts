import { TestBed } from '@angular/core/testing';

import { InputDetectService } from './input-detect.service';

describe('InputDetectService', () => {
  let service: InputDetectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputDetectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
