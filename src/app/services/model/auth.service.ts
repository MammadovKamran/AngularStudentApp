import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterModel } from '../../models/register';
import { LoginModel } from '../../models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(registerModel: RegisterModel) {
    return this.http.post('https://localhost:3001/register', registerModel);
  }

  login(loginModel: LoginModel) {
    return this.http.post('https://localhost:3001/login', loginModel);
  }
}
