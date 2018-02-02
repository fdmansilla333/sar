import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
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

  constructor() { }

  ngOnInit() {
  }

  onSelect(event) {
    console.log(event);
  }

}
