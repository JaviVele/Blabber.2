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

  onImageSelected(event: any) {
    const file: File = event.target.files[0].name;
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
        console.log(response);
      },
      error => {
        console.error(error);
      }
    );
  }
  


}