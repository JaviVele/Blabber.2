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


  comprobarUsuario(usuario: any): Observable<any> {
   
    const url = 'http://localhost:1337/usuarios';
   console.log(usuario);
    return this.http.post(url , usuario);
  }

  registrarUsuario(usuario: any): Observable<any> {
    console.log(usuario);
    const url = 'http://localhost:1337/';
   
    return this.http.post(url + 'usuarios/nuevo', usuario);
  }



  listarUno(id: any): Observable<any> {
    const url = 'http://localhost:1337/usuarios/' + id;
   
    return this.http.get(url);
  }

  registrarPublicacion(publicacion: any): Observable<any> {
    console.log(publicacion);
    const url = 'http://localhost:1337/';
   
    return this.http.post(url + 'publicaciones', publicacion);
  }

  listarPublicaciones(){
    const url = 'http://localhost:1337/';

    return this.http.get(url + 'publicaciones');
  }

}

