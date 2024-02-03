import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http'
import { Login } from '../model/login';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  login(login: Login): Observable<any> {
    debugger;
    const url = this.URL+'api/auth/login';
    return this.http.post(url, login).pipe(
      tap((event:any) => {
        if (event) {
          debugger;
          const token = event.headers.get('Authorization');
          // Almacenar el token en el almacenamiento local o en un servicio
          localStorage.setItem('token', token ||'s');
        }
      })
    );
  }
}
