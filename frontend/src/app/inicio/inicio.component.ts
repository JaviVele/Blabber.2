import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../services/backend.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  id: number | undefined;
  usuario: any;

  constructor(private route: ActivatedRoute, private backandservice: BackendService ) {
    this.route.params.subscribe(params => {
      this.backandservice.listarUno(params['id']).subscribe(
        response => {
          this.usuario = response;
        },
        error => {
          console.log(error);
        }

      );

      // Aquí puedes utilizar el valor del parámetro id como desees
    });
   }

}