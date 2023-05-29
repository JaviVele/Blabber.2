import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../services/backend.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  id: number | undefined;
  usuario: any;
  contenido: string = '';
  imagen: File | undefined;
  publicacion: any;  
  

  constructor(private route: ActivatedRoute, private backandService: BackendService ) {
    this.route.params.subscribe(params => {
      this.backandService.listarUno(params['id']).subscribe(
        response => {
          this.usuario = response;
        },
        error => {
          console.log(error);
        }

      );
    });
    
   }

  //  ngOnInit(): void {
  //   //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //   //Add 'implements OnInit' to the class.
  //     //this.listarPublicaciones();
  //  }

  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    this.imagen = file;

    console.log(this.imagen);
  }
   onSubmit() {
    const publicacion = {
      contenido: {
        mensaje: this.contenido,
        imagen: this.imagen ? this.imagen: ''
      },
      fecha_publicacion: new Date().toISOString(),
      num_mg: 0,
      num_comentarios: 0,
      id_usuario: this.usuario.id
    };
  
    this.backandService.registrarPublicacion(publicacion).subscribe(
      response => {
        // La solicitud al servidor fue exitosa, puedes manejar la respuesta aquí
        console.log(response);
        //this.publicacion = response;
        // Por ejemplo, puedes mostrar un mensaje de éxito al usuario o redirigirlo a otra página
      },
      error => {
        // La solicitud al servidor generó un error, puedes manejarlo aquí
        console.error(error);
        // Por ejemplo, puedes mostrar un mensaje de error al usuario o realizar alguna otra acción
      }
    );
  }
  


}