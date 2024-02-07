import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse,
} from '@angular/common/http';
import { Login } from '../model/login';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  URL = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  login(login: Login): Observable<any> {
    const url = this.URL + 'api/auth/login';
    return this.http.post<any>(url, login, { observe: 'response' }).pipe(
      tap((response: any) => {
        const header = response.headers;
        const token = header.get('authorization')!;
        this.setToken(token)
      })
    );
  }

  getToken(): string | null {
    const token = localStorage.getItem('token');
    return token || null;
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  signOff() {
    localStorage.clear();
    window.location.reload();
  }

  isAuthenticated() {
    if(this.getToken()){
      return true;
    }
    return false;
  }
}
