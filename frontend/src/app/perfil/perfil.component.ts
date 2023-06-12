import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../services/backend.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  id: any;
  usuario: any;
  foto: boolean = false;
  palabrasMasRepetidas: any[] = [];

  publicaciones: any[] = [];

  constructor(private route: ActivatedRoute, private backandService: BackendService,
     private renderer: Renderer2, private dialog: MatDialog) {
      this.listarTodasPublicaciones();
     }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.backandService.listarUno(params['id']).subscribe(
        response => {
          this.usuario = response;
          this.id = this.usuario.id;
          this.listarPublicaciones(this.id);
          this.fotoPerfil(this.usuario);
        },
        error => {
          console.log(error);
        }
      );
    });
  }


  listarPublicaciones(userId: any) {
        userId = this.id;
        this.backandService.listarPublicacionesUsuario(userId).subscribe(
          (response) => {
            this.publicaciones = response;
            },
          (error) => {
             console.error(error);
          }
        )};

  

  getTimeElapsed(fechaPublicacion: string): string {
    const fechaCreacion = new Date(fechaPublicacion);
    const fechaActual = new Date();
  
    const diferencia = Math.abs(fechaActual.getTime() - fechaCreacion.getTime());
    const segundos = Math.floor(diferencia / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
  
    if (dias > 0) {
      return ` ${ dias} dias`;
    } else if (horas > 0) {
      return ` ${ horas} horas`;
    } else if (minutos > 0) {
      return ` ${ minutos} minutos`;
    } else {
      return 'Ahora mismo';
    }
  }
  
  recargarPagina() {
    this.renderer.setProperty(window, 'location', window.location.href);
  }
  
  
   openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "50%",
      height: "72%",
      position: { top: "-20%", left: "25%" },
      data: {"usuario" : this.usuario}
      

      
    });
    
  }
  fotoPerfil(usuario: any) {
    if (usuario.foto_perfil) {
      this.foto = true;
    }
  }
  listarTodasPublicaciones() {
        this.backandService.listarPublicaciones().subscribe(
          (response) => {
            console.log(response);
            this.contarPalabras(response);
          }
          ,
          (error) => {
            console.error(error);
          }
    );
  }

  contarPalabras(publicaciones: any[]): void {
    const palabras: { [palabra: string]: number } = {};
    //console.log(publicaciones);
    // Recorrer las publicaciones
    for (const publicacion of publicaciones) {
      const mensaje = publicacion.contenido.mensaje;
      //console.log(mensaje);
      // Separar el mensaje en palabras
      const palabrasMensaje = mensaje.split(' ');
      //console.log(palabrasMensaje);
      // Contar las palabras
      for (const palabra of palabrasMensaje) {
        // Ignorar palabras vacías o de longitud menor a 3 caracteres
        if (palabra.trim() !== '' && palabra.length > 2) {
          if (palabras[palabra]) {
            palabras[palabra]++;
          } else {
            palabras[palabra] = 1;
          }
        }
      }
    }
    console.log(palabras);
    const palabrasOrdenadas = Object.entries(palabras).sort((a, b) => b[1] - a[1]);
    console.log(palabrasOrdenadas);
    // Obtener las 5 palabras más frecuentes
    this.palabrasMasRepetidas = palabrasOrdenadas.slice(0, 5).map((item) => item[0]);
    
    
  }
  
}