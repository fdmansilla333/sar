import { Component, OnInit } from '@angular/core';
import {ServicioAplicacion} from '../servicio';

@Component({
  selector: 'app-panel-control',
  templateUrl: './panelControl.component.html',
  styleUrls: ['./panelControl.component.scss'],
  providers: [ServicioAplicacion],
})

export class PanelControlComponent implements OnInit {
  public mensaje: String = '';
  constructor(public servicioApp: ServicioAplicacion) {

  }

  ngOnInit() {

  }

  public abajo() {
    console.log('abajo...');
    this.servicioApp.enviarEvento('abajo').subscribe();
  }

  public arriba() {
    console.log('arriba...');
    this.servicioApp.enviarEvento('arriba').subscribe(res => this.mensaje = res.json(), error => console.log(error), () => {
      console.log(this.mensaje);
    });

  }

  public izquierda() {
    console.log('izquierda...');
    this.servicioApp.enviarEvento('izquierda').subscribe();
  }

  public derecha() {
    console.log('derecha...');
    this.servicioApp.enviarEvento('derecha').subscribe();
  }
  public stop() {
    console.log('Stop');
    this.servicioApp.enviarEvento('stop').subscribe();
  }
}
