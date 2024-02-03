import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Login } from '../model/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  login(user: Login) {
    const url = this.URL+'api/auth/login'
    return this.http.post(url, user);
  }
}
