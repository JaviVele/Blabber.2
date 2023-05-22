import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  usuarios: any[] | undefined;

  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.backendService.obtenerDatos().subscribe(
      data => {
        this.usuarios = data;
      },
      error => {
        console.log('Ocurrió un error al obtener los usuarios:', error);
      }
    );

}
}
