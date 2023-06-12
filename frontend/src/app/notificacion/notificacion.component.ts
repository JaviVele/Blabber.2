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
    const idUsuario = this.id;

    this.backandService.obtenerNotificaciones(idUsuario).subscribe(
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
