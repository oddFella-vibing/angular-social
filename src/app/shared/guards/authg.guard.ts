import { inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivateFn, Router } from '@angular/router';
import { filter } from 'rxjs';

export const authgGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const afauth = inject(AngularFireAuth);

  const user$ = afauth.authState.pipe(filter((user) => user !== null));
  if (!user$) {
    router.navigate(['sign-up']);

    return false;
  } else {
    return true;
  }
};
