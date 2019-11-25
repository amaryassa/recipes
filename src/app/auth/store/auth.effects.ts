import { AuthService } from './../auth.service';
import { User } from './../user.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { of } from 'rxjs';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentification = (email: string, userId: string, token: string, expiresIn: number) => {
  const dateExpiration = new Date(new Date().getTime() + +expiresIn * 1000);
  const user = new User(email, userId, token, dateExpiration);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AutentificateSuccess({
    email: email,
    userId: userId,
    token: token,
    dateExpiration: dateExpiration,
    redirect: true

  });
};
const handleError = (errorRes: any) => {
  let errorMessage = 'an unknown error occured';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AutentificateFail(errorMessage));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'this email exists already';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'this Email does not exist';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'this password is not correct';
      break;

  }
  return of(new AuthActions.AutentificateFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
  ) { }

  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signupAction: AuthActions.SignupStart) => {
      return this.http.post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
        {
          email: signupAction.payload.email,
          password: signupAction.payload.password,
          returnSecureToken: true
        }
      ).pipe(
        tap((resData) => {
          this.authService.setLogoutTimer(+resData.expiresIn * 1000);
        }),
        map(resData => {
          return handleAuthentification(resData.email, resData.localId, resData.idToken, +resData.expiresIn);

        }),
        catchError(errorRes => {
          return handleError(errorRes);
        })
      );
    })
  );





  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http.post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
        {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        }
      ).pipe(
        tap((resData) => {
          this.authService.setLogoutTimer(+resData.expiresIn * 1000);
        }),
        map(resData => {
          return handleAuthentification(resData.email, resData.localId, resData.idToken, +resData.expiresIn);

        }),
        catchError(errorRes => {
          return handleError(errorRes);

        })
      );
    })
  );



  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string,
        id: string,
        _token: string,
        _tokenExpirationDate: string
      } = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return { type: 'jsk' };
      }
      const loaderUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );


      if (loaderUser.token) {
        // this.user.next(loaderUser);

        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.authService.setLogoutTimer(expirationDuration);


        return new AuthActions.AutentificateSuccess({
          email: loaderUser.email,
          userId: loaderUser.id,
          token: loaderUser.token,
          dateExpiration: new Date(userData._tokenExpirationDate),
          redirect: false
        });

      }
      return { type: 'jsk' };
    })
  );


  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.authService.clearLogoutTimer();
      localStorage.removeItem('userData');
      this.router.navigate(['/auth']);
    })
  );

















  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTIFICATE_SUCCESS),
    tap((authSuccessAction: AuthActions.AutentificateSuccess) => {
      if (authSuccessAction.payload.redirect) {
        this.router.navigate(['/']);
      }
    })
  )

}
