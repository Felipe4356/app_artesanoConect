import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { AutenticacionGuard } from './autenticacion.guard';

describe('AutenticacionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => {
        const guard = TestBed.inject(AutenticacionGuard);
        return guard.canActivate(...guardParameters);
      });

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
