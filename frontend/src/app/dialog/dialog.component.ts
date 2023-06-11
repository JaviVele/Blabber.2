import { Component, Inject, Renderer2 } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  constructor(private backandService: BackendService,
    private renderer: Renderer2,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  datosUsuario!: any;

  onClose(): void {
    this.dialogRef.close();
  }
  
  
 
  
  submitForm() {
    this.datosUsuario = {
      id: this.data.usuario.id,
      nombre_usuario: this.data.usuario.nombre_usuario,
      foto_perfil: this.data.usuario.foto_perfil,
      biografia: this.data.usuario.biografia,
      fecha_nacimiento: this.data.usuario.fecha_nacimiento
    };
    this.backandService.actualizarPerfil(this.datosUsuario).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error(error);
      }
    );
    // this.onClose();
    // this.recargarPagina();
  }
  

  handleFileInput(event: any) {
    // Maneja el evento cuando se selecciona un archivo para la foto de perfil
    const file = event.target.files[0];
    this.datosUsuario.foto_perfil = file;
    console.log(this.datosUsuario.foto_perfil);
  }
  recargarPagina() {
    this.renderer.setProperty(window, 'location', window.location.href);
  }
}
