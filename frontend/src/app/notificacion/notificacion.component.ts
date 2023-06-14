import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../services/backend.service';
@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.scss']
})
export class NotificacionComponent implements OnInit {
  id: any;
  usuario: any;
  notificaciones: any[] = [];
  showDialog = false;



  openDialog2() {
    this.showDialog = true;
  }

  cerrarSesion() {    
    // Una vez cerrada la sesión, cierra el diálogo
    this.showDialog = false;
  }
  cerrar() {    
    // Una vez cerrada la sesión, cierra el diálogo
    this.showDialog = false;
  }

  constructor(private route: ActivatedRoute, private backandService: BackendService, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.backandService.listarUno(params['id']).subscribe(
        response => {
          this.usuario = response;
          this.id = this.usuario.id;
          console.log(this.id);
          
          this.obtenerNotificacionesUsuario();
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  obtenerNotificacionesUsuario(): void {
    

    this.backandService.obtenerNotificaciones().subscribe(
      (response: any) => {
        this.notificaciones = response;
        console.log(this.notificaciones);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  
}
