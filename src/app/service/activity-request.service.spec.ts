import { TestBed, inject } from '@angular/core/testing';

import { ActivityRequestService } from './activity-request.service';

describe('ActivityRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivityRequestService]
    });
  });

  it('should be created', inject([ActivityRequestService], (service: ActivityRequestService) => {
    expect(service).toBeTruthy();
  }));
});
