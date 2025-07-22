import { TestBed } from '@angular/core/testing';
import {
  CanActivateChildFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { authGuard } from './auth-guard';

describe('authGuard', () => {
  let router: Router;

  const executeGuard: CanActivateChildFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => TestBed.runInInjectionContext(() => authGuard(route, state));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
    });
    router = TestBed.inject(Router);
  });

  it('should allow access when user is logged in', () => {
    spyOn(localStorage, 'getItem').withArgs('user').and.returnValue('{"token":"some-token"}');
    const canActivate = executeGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
    expect(canActivate).toBe(true);
  });

  it('should prevent access and redirect to /login when user is not logged in', () => {
    spyOn(localStorage, 'getItem').withArgs('user').and.returnValue(null);
    const navigateSpy = spyOn(router, 'navigate');
    const canActivate = executeGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
    expect(canActivate).toBe(false);
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});
