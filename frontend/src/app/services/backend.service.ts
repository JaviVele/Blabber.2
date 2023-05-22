import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  obtenerDatos(): Observable<any> {
    const url = 'http://localhost:1337/';
    return this.http.get(url + 'usuarios');
  }
}

