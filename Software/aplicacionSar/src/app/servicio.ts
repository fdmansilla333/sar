import { Gps } from './Gps';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { AppComponent } from './app.component';
import { Temperatura } from './Temperatura';
import { Sensores } from './Sensores';

@Injectable()
export class ServicioAplicacion {

  public sensores: Sensores;

  constructor(public http: Http, public http2: HttpClient,  public app: AppComponent) {
    this.sensores = new Sensores();
   }

  /**
   * Evento que sirve para enviar desde el componente
   * @param url Url a enviar el evento [arriba, abajo, izquierda, derecha]
   */
  enviarEvento(accion: String): Observable <any> {
    return this.http.get(this.app.rutaBasica + accion);
  }

  solicitarTemperaturaActual(): Observable <Temperatura> {
    return this.http.get(this.app.rutaBasica + 'temperatura')
    .map(res => res.json());
  }
  /**
   * Devuelve ([{ultrasonidoAdelante:proximityAdelante.cm},
		{ultrasonidoDerecho: proximityDerecho.cm},
		{ultrasonidoIzquierdo: proximityIzquierdo.cm}
		])
   */
  solicitarUltrasonidosActual(): Observable <any> {
    return this.http.get(this.app.rutaBasica + 'ultrasonido')
    .map(res => res.json());
  }

  /**devuelve
   * {monoxido: sensor.scaleTo([20,2000]), unidad: "ppm"}
   */
  solicitarMonoxidoActual(): Observable <any> {
    return this.http.get(this.app.rutaBasica + 'monoxido')
    .map(res => res.json());
  }

  solicitarGpsActual(): Observable <Gps> {
    return this.http.get(this.app.rutaBasica + 'gps')
    .map(res => res.json());
  }

  pedirImagen(): Observable<boolean> {
    return this.http.get(this.app.rutaWeb)
    .map(res => res.json());
  }

  actualizarValores(muestraSensores: Sensores) {
    this.sensores = muestraSensores;

  }

  apagar() {
    return this.http.get(this.app.rutaBasica + 'apagar');
  }

  reiniciar() {
    return this.http.get(this.app.rutaBasica + 'reiniciar');
  }

  solicitarTodasTemperaturas(): Observable <Temperatura[]>  {
    return this.http2.get<Temperatura[]>(this.app.rutaBasica + 'temperaturas');
  }


}
