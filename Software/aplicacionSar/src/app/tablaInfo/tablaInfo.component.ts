import { ServicioAplicacion } from './../servicio';
import { Component, OnInit } from '@angular/core';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { AppComponent } from '../app.component';




@Component({
  selector: 'app-tabla-info',
  templateUrl: './tablaInfo.component.html',
  styleUrls: ['./tablaInfo.component.scss'],
})

export class TablaInfoComponent implements OnInit {

  public monoxido: Number;
  public temperatura: any;
  public ultrasonidoIzquierdo: Number;
  public ultrasonidoDerecho: Number;
  public ultrasonidoAdelante: Number;
  public latitud: Number;
  public longitud: Number;

  public areaColision = 20;
  public mensajeColision = '';

  constructor(public app: AppComponent) {


  }

  ngOnInit() {
    IntervalObservable.create(this.app.tiempoDelay)
    .subscribe(res => {
      if (this.app.sensoresActuales.monoxido && this.app.sensoresActuales.temperatura) {
      this.monoxido = this.app.sensoresActuales.monoxido;
      this.temperatura =  this.app.sensoresActuales.temperatura;
      this.ultrasonidoIzquierdo = this.app.sensoresActuales.ultrasonidoIzquierdo;
      this.ultrasonidoDerecho = this.app.sensoresActuales.ultrasonidoDerecho;
      this.ultrasonidoAdelante = this.app.sensoresActuales.ultrasonidoAdelante;
      this.latitud = this.app.sensoresActuales.gps.latitud;
      this.longitud = this.app.sensoresActuales.gps.longitud;
      }
    });

  }

  deteccionColision(): boolean {
    let respuesta = false;
    this.mensajeColision = '';
    if (this.ultrasonidoAdelante <= this.areaColision) {
      this.mensajeColision += 'Objeto adelante \n';
      respuesta =  true;
    }
    if (this.ultrasonidoDerecho <= this.areaColision) {
      this.mensajeColision += 'Objeto a la derecha \n';
      respuesta = true;
    }
    if (this.ultrasonidoIzquierdo <= this.areaColision) {
      respuesta = true;
      this.mensajeColision += 'Objeto a la izquierda\n';
    }
    if (respuesta === false) {
      this.mensajeColision = 'Objetos no detectados';
    }
    return respuesta;
  }

}
