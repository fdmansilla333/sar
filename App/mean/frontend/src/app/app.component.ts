import { Component } from '@angular/core';
import {TemperaturaService} from './temperatura.service';
import { Temperatura } from './Temperatura';

import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TemperaturaService],
})
export class AppComponent {
  title = 'Sistema Autónomo Robótico';
  public temperaturas: Temperatura[];
  constructor(public service: TemperaturaService) {
    service.getTemperaturas().subscribe(res => {console.log(res); this.temperaturas = res; }, error => console.log(error), () => {
      console.log('Finalizo la solicitud de temperaturas');
    });
  }
}
