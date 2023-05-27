import { Component } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','./login.component.scss']
})
export class LoginComponent {
  nombre_arroba: string = '';
  contrasena: string = '';
  submitted: boolean = false;

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
          console.log(response);
          let id = response.usuario.id;
          this.router.navigate(['/inicio', id]);
        },
        error => {
          console.error(error);
        }
      );
    }
  }
}

