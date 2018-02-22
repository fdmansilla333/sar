  import { Component, OnInit } from '@angular/core';
import { ServicioAplicacion } from '../servicio';
import { Temperatura } from '../Temperatura';
  

  @Component({
    selector: 'app-estadisticas',
    templateUrl: './estadisticas.component.html',
    styleUrls: ['./estadisticas.component.css'],
    providers: [ServicioAplicacion]
  })
  export class EstadisticasComponent implements OnInit {
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = 'Tiempo x Días';
    showYAxisLabel = true;
    yAxisLabel = 'Temperatura media por horas';
    single: any[];
    multi = [
      {
        'name': '1-2-2019',
        'series': [
          {
            'name': '-10',
            'value': -10
          },
          {
            'name': '10',
            'value': 10
          }
        ]
      },
      {
        'name': '3-2-2019',
        'series': [
          {
            'name': '18:00',
            'value': -10
          },
          {
            'name': '19:00',
            'value': 10
          }
        ]
      },
      {
        'name': '5-2-2019',
        'series': [
          {
            'name': '18:00',
            'value': -10
          },
          {
            'name': '19:00',
            'value': 10
          }
        ]
      },

      {
        'name': '31-1-2018',
        'series': [
          {
            'name': '10:00',
            'value': 50
          },
          {
            'name': '11:00',
            'value': 12
          },
          {
            'name': '12:00',
            'value': 13
          },
          {
            'name': '13:00',
            'value': 16
          }
        ]
      }
    ];



    colorScheme = {
      domain: ['#2a336d', '#07d3ea', '#f9c404', '#f90303']
    };


    LineashowXAxis = true;
    LineashowYAxis = true;
    Lineagradient = false;
    LineashowLegend = true;
    LineashowXAxisLabel = true;
    LineaxAxisLabel = 'Horas';
    LineashowYAxisLabel = true;
    LineayAxisLabel = 'Valor medio PPM';
    Lineasingle = [
      {
        'name': 'Monoxido',
        'series': [
          {
            'name': '1',
            'value': 100
          },
          {
            'name': '2',
            'value': 300
          }
        ]
      }
    ];
    LineacolorScheme = {
      domain: ['#2a336d', '#07d3ea', '#07d3ea', '#07d3ea']
    };

    valorPPM: number;

    constructor(protected servicio: ServicioAplicacion) { }

    ngOnInit() {

      this.servicio.solicitarTodasTemperaturas().subscribe(colTemperaturas => this.cargarEstadisticaTemperatura(colTemperaturas));
    }

    onSelect(event) {
      console.log(event);
    }

    agregarValor() {
      let lista = this.Lineasingle;
      this.Lineasingle = [];
      const hoy = new Date().getHours().toString() + ':' + new Date().getMinutes().toString() + ':' + new Date().getSeconds().toString();
      lista[0].series.push({'name': hoy, 'value': this.valorPPM});
      this.Lineasingle.push(lista[0]);
      console.log(this.Lineasingle);
    }

    cargarEstadisticaTemperatura(temperaturas: Temperatura[]) {
      this.multi = [];

      temperaturas.forEach(t => {
        let obj =  {
          'name': t.fecha.getUTCDate()  + '/' + t.fecha.getMonth() + 1 + '/' + t.fecha.getFullYear(),
          'series': [
            {
              'name': '18:00',
              'value': -10
            },
            {
              'name': '19:00',
              'value': 10
            }
          ]
        };
      });
    }

  }
