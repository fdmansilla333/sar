import { Sensores } from './../Sensores';
import { Component, OnInit, NgModule } from '@angular/core';
import { ServicioAplicacion } from '../servicio';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { Gps } from '../Gps';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-tabla-sensores',
  templateUrl: './tablaSensores.component.html',
  styleUrls: ['./tablaSensores.component.scss'],
  providers: [ServicioAplicacion]
})

export class TablaSensoresComponent implements OnInit {
  public temperaturaActual: any;
  public coActual: any;
  public gps: Gps;
  public uDerecha: any;
  public uIzquierda: any;
  public uAdelante: any;


  constructor(public servicio: ServicioAplicacion, public app: AppComponent) {
    this.gps = new Gps();

  }

  public solicitarDatosDeSensores() {

    this.servicio.solicitarTemperaturaActual()
      .subscribe(temperatura => {
        this.temperaturaActual = temperatura.valor; // Revisar
      }, error => this.temperaturaActual = 'Error');
    this.servicio.solicitarMonoxidoActual()
      .subscribe(monoxido => this.coActual = monoxido.monoxido, error => this.coActual = 'Error');
    this.servicio.solicitarGpsActual()
      .subscribe(resGps => {this.gps = resGps; });

    this.servicio.solicitarUltrasonidosActual()
      .subscribe(ultrasonidos => {
        this.uAdelante = ultrasonidos[0].ultrasonidoAdelante;
        this.uDerecha = ultrasonidos[1].ultrasonidoDerecho;
        this.uIzquierda = ultrasonidos[2].ultrasonidoIzquierdo;
      }, error => {
        this.uAdelante = 'Error';
        this.uDerecha = 'Error';
        this.uIzquierda = 'Error';
      });

      /**Paso de parametros al padre 
       * TODO cambiar el acceso a tabla informacion para no pasar por el padre
       * 
      */
      this.app.sensoresActuales.gps = this.gps;
      this.app.sensoresActuales.ultrasonidoAdelante = this.uAdelante;
      this.app.sensoresActuales.ultrasonidoDerecho = this.uDerecha;
      this.app.sensoresActuales.ultrasonidoIzquierdo = this.uIzquierda;
      this.app.sensoresActuales.monoxido = this.coActual;
      this.app.sensoresActuales.temperatura = this.temperaturaActual;

  }

  ngOnInit() {

    IntervalObservable.create(this.app.tiempoDelay)
      .subscribe(res => this.solicitarDatosDeSensores());


  }
}
