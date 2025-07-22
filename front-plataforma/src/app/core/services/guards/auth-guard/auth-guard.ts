// src/app/guards/auth.guard.ts

import { CanActivateChildFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateChildFn = (
  childRoute: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const user = localStorage.getItem('user');

  if (user) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};

