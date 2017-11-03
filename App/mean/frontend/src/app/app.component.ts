import { ServicioAplicacion } from './servicio';
import { Component } from '@angular/core';
import {TemperaturaService} from './temperatura.service';
import { Temperatura } from './Temperatura';

import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TemperaturaService, ServicioAplicacion],
})
export class AppComponent {
  titulo = 'Sistema Autónomo Robótico';
  public temperaturas: Temperatura[];
  constructor(public service: TemperaturaService, public servicioApp: ServicioAplicacion) {
    service.getTemperaturas().subscribe(res => {console.log(res); this.temperaturas = res; }, error => console.log(error), () => {
      console.log('Finalizo la solicitud de temperaturas');
    });
  }

  public abajo() {
    console.log('abajo...');
    this.servicioApp.enviarEvento('abajo').subscribe();
  }

  public arriba() {
    console.log('arriba...');
    this.servicioApp.enviarEvento('arriba').subscribe();
  }

  public izquierda() {
    console.log('izquierda...');
    this.servicioApp.enviarEvento('izquierda').subscribe();
  }

  public derecha() {
    console.log('derecha...');
    this.servicioApp.enviarEvento('derecha').subscribe();
  }
  public stop() {
    console.log('Stop');
    this.servicioApp.enviarEvento('stop').subscribe();
  }
}
