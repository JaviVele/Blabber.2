import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../services/backend.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  isDisabled: boolean = true;
  id: any;
  usuario: any;
  contenido: string = '';
  imagen: File | undefined;
  publicacion: any;  
  publicaciones: any[] = [];
  usuarioSeguidos: any[] = [];

  constructor(private route: ActivatedRoute, private backandService: BackendService) {}
  
   ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.backandService.listarUno(params['id']).subscribe(
          response => {
            this.usuario = response;
            this.id = this.usuario.id;
            console.log(this.id);
            this.obtenerUsuariosSeguidos();
          },
          error => {
            console.log(error);
          }
  
        );
      });
       this.listarPublicaciones();
       
   }

   checkInput() {
    if (this.contenido.trim() !== '') {
      this.isDisabled = false;
    } else {
      this.isDisabled = true;
    }
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
        this.listarPublicaciones();
      },
      error => {
        console.error(error);
      }
    );

    
  }

  listarPublicaciones() {
    this.backandService.listarPublicaciones().subscribe(
      (response) => {
        this.publicaciones = response.filter((publicacion) =>
          this.usuarioSeguidos.some((seguido) => seguido.id === publicacion.id_usuario)
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }

  obtenerUsuariosSeguidos() {
    this.backandService.obtenerUsuariosSeguidos(this.usuario.id).subscribe(
      (response) => {
        this.usuarioSeguidos = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }


 


}