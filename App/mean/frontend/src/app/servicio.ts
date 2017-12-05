import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ServicioAplicacion {

  constructor(public http: Http) { }

  /**
   * Evento que sirve para enviar desde el componente
   * @param url Url a enviar el evento [arriba, abajo, izquierda, derecha]
   */
  enviarEvento(url: String): Observable <any> {
    return this.http.get('http://192.168.2.1:3000/api/' + url);
  }

}
