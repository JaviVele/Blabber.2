import { Component } from '@angular/core';
import { BackendService } from '../services/backend.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','./login.component.scss']
})
export class LoginComponent {
  nombre_arroba: string = '';
  contrasena: string = '';
  submitted: boolean = false;


  constructor(private backendService: BackendService) { }

 

  onSubmit() {
    this.submitted = true;

    if (this.nombre_arroba && this.contrasena) {

    const data = {
      nombre_arroba: this.nombre_arroba,
      contrasena: this.contrasena,
    }
    // Aquí puedes agregar la lógica para enviar los datos del formulario al servidor
    this.backendService.comprobarUsuario(data).subscribe(
      response => {
        // La solicitud al servidor fue exitosa, puedes manejar la respuesta aquí
        console.log(response);
        // Por ejemplo, puedes mostrar un mensaje de éxito al usuario o redirigirlo a otra página
      },
      error => {
        // La solicitud al servidor generó un error, puedes manejarlo aquí
        console.error(error);
        // Por ejemplo, puedes mostrar un mensaje de error al usuario o realizar alguna otra acción
      }
    );
  }
  
    //console.log(this.usuario);
    // Por ejemplo, puedes usar un servicio para realizar una solicitud HTTP al backend
    // y manejar la respuesta en consecuencia
  }
}
