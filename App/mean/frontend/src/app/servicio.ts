import { Gps } from './Gps';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { AppComponent } from './app.component';
import { Temperatura } from './Temperatura';


@Injectable()
export class ServicioAplicacion {

  constructor(public http: Http, public app: AppComponent) { }

  /**
   * Evento que sirve para enviar desde el componente
   * @param url Url a enviar el evento [arriba, abajo, izquierda, derecha]
   */
  enviarEvento(url: String): Observable <any> {
    return this.http.get('http://192.168.2.1:3000/api/' + url);
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


}
