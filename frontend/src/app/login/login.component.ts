import { Component } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  nombre_arroba: string = '';
  contrasena: string = '';
  submitted: boolean = false;
  registrado: boolean = true;

  constructor(private backendService: BackendService, private router: Router) { }

  onSubmit() {
    this.submitted = true;

    if (this.nombre_arroba && this.contrasena) {
      const data = {
        nombre_arroba: this.nombre_arroba,
        contrasena: this.contrasena,
      };

      this.backendService.comprobarUsuario(data).subscribe(
        response => {
          this.registrado = true;
          let id = response.usuario.id;
          this.router.navigate(['/inicio', id]);
        },
        error => {
          console.error(error);
          this.registrado = false;

        }
      );
    }
  }
}

