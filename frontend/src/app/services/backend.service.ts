import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  obtenerDatos(): Observable<any> {
    const url = 'http://localhost:1337/';
    return this.http.get(url + 'usuarios');
  }

  registrarUsuario(usuario: any): Observable<any> {
    const url = 'http://localhost:1337/';
   
    return this.http.post(url + 'usuarios', usuario);
  }

  comprobarUsuario(usuario: any): Observable<any> {
   
    const url = 'http://localhost:1337/';
   
    return this.http.post(url + 'usuarios/comprobarUsuario', usuario);
  }

  listarUno(id: any): Observable<any> {
    const url = 'http://localhost:1337/usuarios/' + id;
   
    return this.http.get(url);
  }

  registrarPublicacion(publicacion: any): Observable<any> {
    const formData = new FormData();
    formData.append('contenido', publicacion.contenido);
    formData.append('fecha_publicacion', publicacion.fecha_publicacion);
    formData.append('num_mg', publicacion.num_mg);
    formData.append('num_comentarios', publicacion.num_comentarios);
    formData.append('id_usuario', publicacion.id_usuario);
    formData.append('imagen', publicacion.imagen);
    console.log(formData);
  
    const url = 'http://localhost:1337/';
  
    return this.http.post(url + 'publicaciones', formData);
  }
  
  
  

  listarPublicaciones(): Observable<any[]> {
    const url = 'http://localhost:1337/publicaciones';
    return this.http.get<any[]>(url);
  }

  obtenerUsuariosSeguidos(userId: any): Observable<any> {
    const params = new HttpParams().set('userId', userId);
    const url = 'http://localhost:1337/seguidos/';
    return this.http.get(url,{params});
  }

  darMeGusta(id_publicacion: number, id_usuario: number): Observable<any> {
    const data = {
      id_usuario: id_usuario,
      id_publicacion: id_publicacion
      
      
    };
    console.log(data);
  
    return this.http.post<any>('http://localhost:1337/megustas', data);
  }

  actualizarPerfil(usuario: any): Observable<any> {
   
    const url = 'http://localhost:1337/';

    return this.http.post(url + 'usuarios/actualizar', usuario);
  }
  agregarRespuesta(idPublicacion: number, idUsuario: number, nuevoComentario: any): Observable<any> {
    const url = 'http://localhost:1337/comentarios';
     // Ruta del controlador en Sails
    const respuesta = {
      contenido: nuevoComentario.contenido,
      fecha_contenido: nuevoComentario.fecha_contenido,
      num_mg: nuevoComentario.num_mg,
      id_usuario: idUsuario,
      id_publicaciones: idPublicacion
  };

  console.log(respuesta);

    return this.http.post(url, respuesta);
  }

  obtenerComentarios(publicacionId: number) {
    const url = 'http://localhost:1337/comentarios/' + publicacionId;
     
    console.log(publicacionId)// Reemplaza con la URL correcta para obtener los comentarios de la publicación
    return this.http.get(url);
  }
  
}

