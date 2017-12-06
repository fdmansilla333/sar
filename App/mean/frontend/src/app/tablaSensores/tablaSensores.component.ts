import { Component, OnInit } from '@angular/core';
import {ServicioAplicacion} from '../servicio';
import { Gps } from '../Gps';

@Component({
  selector: 'app-tablaSensores',
  templateUrl: './tablaSensores.component.html',
  styleUrls: ['./tablaSensores.component.scss'],
  providers: [ServicioAplicacion],
})

export class TablaSensoresComponent implements OnInit {
  public temperaturaActual: any;
  public coActual: any;
  public gps: Gps;
  public uDerecha: any;
  public uIzquierda: any;
  public uAdelante: any;


  constructor(public servicio: ServicioAplicacion) {

  }

  ngOnInit() {
    this.servicio.solicitarTemperaturaActual()
    .subscribe(temperatura => this.temperaturaActual = temperatura.valor, error => this.temperaturaActual = 'Error');
    this.servicio.solicitarMonoxidoActual()
    .subscribe(monoxido => this.coActual = monoxido, error => this.coActual = 'Error');
    this.servicio.solicitarGpsActual()
    .subscribe(resGps => this.gps = resGps, error => {
      this.gps = new Gps();
    });
    this.servicio.solicitarUltrasonidosActual()
    .subscribe(ultrasonidos => {
      this.uAdelante = ultrasonidos.ultrasonidoAdelante;
      this.uDerecha = ultrasonidos.ultrasonidoDerecha;
      this.uIzquierda = ultrasonidos.ultrasonidoIzquierda;
    }, error => {
      this.uAdelante = 'Error';
      this.uDerecha = 'Error';
      this.uIzquierda = 'Error';
    });

  }
}
