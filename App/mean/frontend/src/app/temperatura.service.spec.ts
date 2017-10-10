import { TestBed, inject } from '@angular/core/testing';

import { TemperaturaService } from './temperatura.service';

describe('TemperaturaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TemperaturaService]
    });
  });

  it('should be created', inject([TemperaturaService], (service: TemperaturaService) => {
    expect(service).toBeTruthy();
  }));
});
