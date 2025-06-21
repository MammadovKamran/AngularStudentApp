import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RegisterModel } from '../../models/register';
import { LoginModel } from '../../models/login';
import { Observable, tap, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  register(registerModel: RegisterModel) {
    return this.http.post('https://localhost:3001/register', registerModel);
  }

  login(loginModel: LoginModel): Observable<any> {
    return this.http.post('https://localhost:3001/login?useSessionCookies=true&useCookies=true', loginModel)
      .pipe(
        tap(() => {
          // If we reach here, the request was successful (no error thrown)
          this.setAuthorizationStatus(true);
        }),
        catchError((error) => {
          // If there's an error, set authorization to false
          this.setAuthorizationStatus(false);
          return of(error);
        })
      );
  }

  setAuthorizationStatus(isAuthorized: boolean): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem('isAuthorized', isAuthorized.toString());
    }
  }

  isAuthorized(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const authStatus = sessionStorage.getItem('isAuthorized');
      return authStatus === 'true';
    }
    return false; 
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem('isAuthorized');
    }
  }
}
