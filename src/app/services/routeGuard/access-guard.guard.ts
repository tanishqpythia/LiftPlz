import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CanActivateFn, Router } from '@angular/router';
import { of } from 'rxjs';



export const accessGuardGuard: CanActivateFn = (route, state) => {


  const authService = inject(AuthService);
  const router = inject(Router)
  const path = route.url[0].path
  if(authService.hasAccess(path)){
    return of(true);
  }
  else{
    return of(router.createUrlTree(['/signIn']));
  }
}
