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
  usuarioNotificacion : any[] = [];


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
      (response) => {
        this.obtenerDatosUsuario(response);
        this.notificaciones = response;
        console.log(this.notificaciones)
      },
      (error) => {
        console.error(error);
      }
    );
  };
  direccionar(id: any){
    this.router.navigate(['/perfil', id]);

  }
  obtenerDatosUsuario(ids: any){
    for (let index = 0; index < ids.length; index++) {
      const id = ids[index].id_ajeno;
      this.backandService.listarUno(id).subscribe(
        response => {
          this.usuarioNotificacion.push(response);
        },
        error => {
          console.log(error);
        }
        );
      }
      console.log(this.usuarioNotificacion);
  }
}
