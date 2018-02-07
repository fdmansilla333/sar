import { Component, OnInit } from '@angular/core';
import { ServicioAplicacion } from '../servicio';

@Component({
  selector: 'app-panel-inferior',
  templateUrl: './panelInferior.component.html',
  styleUrls: ['./panelInferior.component.scss'],
  providers: [ServicioAplicacion]
})

export class PanelInferiorComponent implements OnInit {

  constructor(public servicio: ServicioAplicacion) {

  }

  ngOnInit() {



  }
  reiniciar() {

    console.log('solicitando reinicio');
    this.servicio.reiniciar().subscribe();

  }

  apagar() {

    console.log('solicitando apagado');
    this.servicio.apagar().subscribe();

  }
}
