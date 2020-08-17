import { TestBed } from '@angular/core/testing';

import { ChatCallService } from './chat-call.service';

describe('ChatCallService', () => {
  let service: ChatCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
