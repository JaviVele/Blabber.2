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

  publicaciones: any[] = [];

  constructor(private route: ActivatedRoute, private backandService: BackendService,
     private renderer: Renderer2, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.backandService.listarUno(params['id']).subscribe(
        response => {
          this.usuario = response;
          this.id = this.usuario.id;
          this.listarPublicaciones(this.id);
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
  
}