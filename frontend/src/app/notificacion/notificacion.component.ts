import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../services/backend.service';
import { SessionStorageService } from '../services/session-storage.service';
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
  usuarioNotificacion: any;
  idajeno: any;
  datosUser: any;

  openDialog() {
    this.showDialog = true;
  }

  cerrarSesion() {    
    // Una vez cerrada la sesión, cierra el diálogo
    this.sessionStorageService.removeItem("usuarioPrincipal");
    this.router.navigate(['/login']);

    this.showDialog = false;
  }
  cerrar() {    
    // Una vez cerrada la sesión, cierra el diálogo
    this.showDialog = false;
  }

  constructor(private route: ActivatedRoute, private backandService: BackendService, private renderer: Renderer2,
    private sessionStorageService: SessionStorageService,
    private router: Router ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.backandService.listarUno(params['id']).subscribe(
        response => {
          this.usuario = response;
          this.id = this.usuario.id;
          
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
      (response) => {
        //this.obtenerDatosUsuario(response);
        
        this.notificaciones = response;
        this.notificaciones.forEach(element => {
          if (element.id_ajeno == this.id) {
            this.usuarioNotificacion = element.id_usuario;
          }
        })
        this.obtenerDatosUsuario(this.usuarioNotificacion);
        console.log(this.usuarioNotificacion);
        console.log(this.notificaciones);
      },
      (error) => {
        console.error(error);
      }
    );
  };
  direccionar(id: any){
    this.router.navigate(['/perfil', id]);

  }
  obtenerDatosUsuario(id: any){
      this.backandService.listarUno(id).subscribe(
        response => {
          this.datosUser = response;
          console.log(this.datosUser);
        },
        error => {
          console.log(error);
        }
      );
  }
}
