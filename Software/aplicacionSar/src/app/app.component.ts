import { Sensores } from './Sensores';
import { Component } from '@angular/core';
import { TemperaturaService } from './temperatura.service';
import { Temperatura } from './Temperatura';

import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TemperaturaService],
})
export class AppComponent {
  titulo = 'Sistema Autónomo Robótico';
  public temperaturas: Temperatura[];
  public sensoresActuales: Sensores;
  public tiempoDelay;
  public mensaje = '';

 
  public rutaBasica = 'http://192.168.2.1:3000/api/';
  // public rutaBasica = 'http://localhost:3000/api/';
  // public rutaBasica = 'http://192.168.1.39:3000/api/';
  public rutaWeb = 'http://192.168.2.1:8081';

  constructor(public service: TemperaturaService) {
    this.sensoresActuales = new Sensores();
    this.tiempoDelay = 1000;

  }

}
