import { TestBed } from '@angular/core/testing';

import { NotificationTriggerService } from './notification-trigger.service';

describe('NotificationTriggerService', () => {
  let service: NotificationTriggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationTriggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
