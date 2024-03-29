import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Peticion } from '../model/peticion';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  URL = 'http://localhost:8080/'

  constructor(private http: HttpClient) { }
  
  getAllPlayList() :Observable<Peticion[]>{
    const url = this.URL+'lists';
    return this.http.get<Peticion[]>(url);
  }

  getPlayListByName(name: string): Observable<Peticion>{
    const url = this.URL+`lists/${name}`;
    return this.http.get<Peticion>(url);
  }

  savePlayList(form:any): Observable<Peticion>{
    const url = this.URL+'lists';
    return this.http.post<Peticion>(url,form);
  }

  deletePlayList(name:string): Observable<void>{
    const url = this.URL+`lists/${name}`;
    return this.http.delete<void>(url);
  }

}
