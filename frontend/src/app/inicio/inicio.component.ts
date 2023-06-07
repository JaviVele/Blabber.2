import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../services/backend.service';
//import { formatDistanceToNow } from 'date-fns';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  isDisabled: boolean = true;
  id: any;
  usuario: any;
  contenido: string = '';
  imagen: File | undefined;
  publicaciones: any[] = [];
  usuarioSeguidos: any[] = [];

  constructor(private route: ActivatedRoute, private backandService: BackendService, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.backandService.listarUno(params['id']).subscribe(
        response => {
          this.usuario = response;
          this.id = this.usuario.id;
          this.obtenerUsuariosSeguidos(this.id);
          this.listarPublicaciones(this.id);
        },
        error => {
          console.log(error);
        }
      );
    });
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
        imagen: this.imagen ? this.imagen : ''
      },
      fecha_publicacion: new Date().toISOString(),
      num_mg: 0,
      num_comentarios: 0,
      id_usuario: this.usuario.id
    };

    this.backandService.registrarPublicacion(publicacion).subscribe(
      response => {
        console.log(response);
        this.listarPublicaciones(this.id);
      },
      error => {
        console.error(error);
      }
    );
  }

  obtenerUsuariosSeguidos(userId: any) {
    this.backandService.obtenerUsuariosSeguidos(userId).subscribe(
      response => {
        this.usuarioSeguidos = response;
        console.log(response);
      },
      error => {
        console.error(error);
      }
    );
  }

  listarPublicaciones(userId: any) {
    this.backandService.obtenerUsuariosSeguidos(userId).subscribe(
      (response) => {
        const usuariosSeguidos = response.map((seguido: any) => seguido.seguido_id.id);
        usuariosSeguidos.push(userId); // Agregar el ID del usuario logueado
  
        this.backandService.listarPublicaciones().subscribe(
          (response) => {
            this.publicaciones = response.filter((publicacion) => {
              return usuariosSeguidos.includes(publicacion.id_usuario);
            });
          },
          (error) => {
            console.error(error);
          }
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }
  reloadPage() {
    this.renderer.setProperty(window, 'location', window.location.href);
  }
  

  getTimeElapsed(fechaPublicacion: string): string {
    const fechaCreacion = new Date(fechaPublicacion);
    const fechaActual = new Date();
  
    const diferencia = Math.abs(fechaActual.getTime() - fechaCreacion.getTime());
    const segundos = Math.floor(diferencia / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
  
    if (dias > 0) {
      return `${dias}d`;
    } else if (horas > 0) {
      return `${horas}h`;
    } else if (minutos > 0) {
      return `${minutos}m`;
    } else {
      return 'Ahora mismo';
    }
  }

  darMeGusta(publicacion: any) {
    const id_usuario = this.id; // Reemplaza 1 con el ID del usuario actualmente logueado
    this.backandService.darMeGusta(publicacion.id, id_usuario).subscribe(
      response => {
        // Actualizar el contador de "Me gusta" en la publicación
        publicacion.num_mg = response.num_mg;
      },
      error => {
        console.error(error);
      }
    );
  }
  
  
  
  
  
  
}
