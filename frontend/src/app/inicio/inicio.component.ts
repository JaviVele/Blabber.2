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
  usuario!: any;
  contenido: string = '';
  imagen: any;
  publicaciones: any[] = [];
  usuarioSeguidos: any[] = [];
  foto: boolean = false;
  fotoSeguido: boolean = false;
  nuevaRespuesta: string = '';
  mostrarPopUp = false;
  publicacionSeleccionadaId: number = 0;
  comentarios: any[] = [];


  constructor(private route: ActivatedRoute, private backandService: BackendService, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.backandService.listarUno(params['id']).subscribe(
        response => {
          this.usuario = response;
          this.id = this.usuario.id;
          this.fotoPerfil(this.usuario);
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
    const file: File = event.target.files[0];
    this.imagen = file;
    console.log(this.imagen);
  }

  onSubmit() {
    console.log(this.imagen);
  
    const publicacion = {
      contenido: this.contenido,
      fecha_publicacion: new Date().toISOString(),
      num_mg: 0,
      num_comentarios: 0,
      id_usuario: this.usuario.id,
      imagen: this.imagen,
    };
  
    this.backandService.registrarPublicacion(publicacion).subscribe(
      response => {
        this.listarPublicaciones(this.id);
      },
      error => {
        console.error(error);
      }
    );
  }
  

  fotoPerfil(usuario: any) {
    if (usuario.foto_perfil) {
      this.foto = true;
    }
  }
  fotoUsuariSeguido(usuario: any){
    if (usuario.foto_perfil) {
      this.fotoSeguido = true;
    }
  }

  obtenerUsuariosSeguidos(userId: any) {
    this.backandService.obtenerUsuariosSeguidos(userId).subscribe(
      response => {
        this.usuarioSeguidos = response;
        this.fotoUsuariSeguido(this.usuarioSeguidos);

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
  recargarPagina() {
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

  abrirPopUp(publicacionId: number) {
    this.mostrarPopUp = true;
    this.publicacionSeleccionadaId = publicacionId;
    // Lógica adicional para obtener y configurar la publicación correspondiente al publicacionId si es necesario
    this.backandService.obtenerComentarios(publicacionId).subscribe(
      (response: any) => {
        this.comentarios = response; // Almacena los comentarios en la variable 'comentarios'
      },
      (error) => {
        console.error(error);
      }
    );
  }

  cerrarPopUp() {
    this.mostrarPopUp = false;
    this.nuevaRespuesta = '';
  }

  agregarRespuesta(publicacion: any) {
    if (this.nuevaRespuesta !== '') {
      const nuevoComentario = {
        contenido: this.nuevaRespuesta,
        fecha_contenido: new Date().toISOString(),
        num_mg: 0,
      };
      console.log(this.publicacionSeleccionadaId);
      this.backandService.agregarRespuesta(this.publicacionSeleccionadaId, this.usuario.id, nuevoComentario)
      
        .subscribe(
          (response) => {
            // La respuesta se ha agregado correctamente en el servidor
            //publicacion.comentarios.push(nuevoComentario);
            
            this.nuevaRespuesta = '';
          },
          (error) => {
            // Manejar el error en caso de fallo en la solicitud
            console.error(error);
          }
        );
    }
    this.cerrarPopUp();
    
  }
  
  
  
  
  
  
}
