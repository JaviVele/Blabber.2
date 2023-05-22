import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private backendService: BackendService) { }



  usuario: any = {
    nombre_usuario: '',
    nombre_arroba: '',
    correo: '',
    contrasena: '',
    fecha_nacimiento: '',
    
};

  onSubmit() {
    
    // Aquí puedes agregar la lógica para enviar los datos del formulario al servidor
    this.backendService.registrarUsuario(this.usuario).subscribe(
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
    //console.log(this.usuario);
    // Por ejemplo, puedes usar un servicio para realizar una solicitud HTTP al backend
    // y manejar la respuesta en consecuencia
  }
}


