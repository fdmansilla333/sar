import { ServicioAplicacion } from './../servicio';
import { Component, OnInit } from '@angular/core';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-capturaVideo',
  templateUrl: './capturaVideo.component.html',
  styleUrls: ['./capturaVideo.component.scss'],
  providers: [ServicioAplicacion]
})

export class CapturaVideoComponent implements OnInit {
  public solicitarTransmision = false;
  public mensajeBoton = 'Activar';
  constructor(public servicio: ServicioAplicacion, public app: AppComponent) {

  }

  ngOnInit() {}



  public activarTransmision() {
    if (this.solicitarTransmision) {
      this.solicitarTransmision = false;
      this.mensajeBoton = 'Activar';
    }else {
      this.solicitarTransmision = true;
      this.mensajeBoton = 'Desactivar';
    }
  }
}
