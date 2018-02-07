import { Temperatura } from './Temperatura';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class TemperaturaService {

  constructor(public http: Http) { }

  getTemperaturas(): Observable <Temperatura[]> {
    return this.http.get('/api/temperaturas')
    .map(res => res.json());
  }

}
