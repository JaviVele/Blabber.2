import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../services/backend.service';
import { MatDialog } from '@angular/material/dialog';

import { SessionStorageService } from '../services/session-storage.service';
@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.scss']
})
export class MensajeComponent implements OnInit {
  id: any;
  usuario: any;
  usuarioSesion: any;
  foto: boolean = false;
  seguido: boolean = false;
  conversaciones: any[] = [];
  idUsuarioRecibe: number | null = null;
  contenido: string = '';
  usuarios: any[] = [];
  constructor(private route: ActivatedRoute, private backandService: BackendService,
    private renderer: Renderer2, private dialog: MatDialog, private sessionStorageService: SessionStorageService,
    private router: Router) {
    
  }

  ngOnInit(): void {
    // Para acceder a la variable almacenada en la sesión desde el nuevo componente
    this.usuarioSesion = this.sessionStorageService.getItem('usuarioPrincipal');
    this.route.params.subscribe(params => {
      this.backandService.listarUno(params['id']).subscribe(
        response => {
          this.usuario = response;
          this.id = this.usuario.id;
          
          this.fotoPerfil(this.usuario);
          console.log(this.id);
          this.obtenerConversaciones();
          this.obtenerUsuarios();
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  fotoPerfil(usuario: any) {
    if (usuario.foto_perfil) {
      this.foto = true;
    }
  }

  
  recargarPagina() {
    this.renderer.setProperty(window, 'location', window.location.href);
  }

  obtenerConversaciones(): void {
    this.backandService.obtenerConversaciones(this.id).subscribe(
      (conversaciones) => {
        this.conversaciones = conversaciones;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  seleccionarUsuario(event: Event) {
    const usuarioId = (event.target as HTMLInputElement).value;
    console.log(usuarioId);
    this.idUsuarioRecibe = usuarioId ? Number(usuarioId) : null;
  }
  
  obtenerUsuarios() {
    this.backandService.obtenerDatos().subscribe(
      response => {
        this.usuarios = response;
      },
      error => {
        console.error(error);
      }
    );
  }

  crearMensaje() {
    if (this.idUsuarioRecibe) {
      console.log(this.idUsuarioRecibe);
      const mensaje = {
        contenido: this.contenido,
        id_usuario_envia: this.usuario.id,
        id_usuario_recibe: this.idUsuarioRecibe
      };

      this.backandService.crearMensaje(mensaje).subscribe(
        (response) => {
          // El mensaje se ha enviado correctamente, puedes realizar acciones adicionales si es necesario
          this.contenido = ''; // Limpiar el campo de entrada del mensaje
          this.idUsuarioRecibe = 0; // Reiniciar la selección del usuario destinatario
        },
        (error) => {
          console.error(error);
        }
      );
    
    } else {
      console.log('Por favor, selecciona un usuario destinatario.');
    }
  }
}
