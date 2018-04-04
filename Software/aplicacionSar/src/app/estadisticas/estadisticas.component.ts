import { Component, OnInit } from '@angular/core';
import { ServicioAplicacion } from '../servicio';
import { Temperatura } from '../Temperatura';
import { GraficaTemperatura } from '../graficaTemperatura';
import { Serie } from '../Serie';
import { Monoxido } from '../Monoxido';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';


@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css'],
  providers: [ServicioAplicacion]
})
export class EstadisticasComponent implements OnInit {
  VENTANAACTUALIZACION = 1000;
  lineaAncho = 800;
  lineaAlto = 400;
  tempAncho = 800;
  tempAlto = 400;
  view: number[];
  viewTemp: number[];
  fechai: Date;
  fechaf: Date;
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
      'name': 'Columna fija',
      'series': [
        { 'name:': '0:00', 'value': 3 },

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

      ]
    }
  ];
  LineacolorScheme = {
    domain: ['#2a336d', '#07d3ea', '#07d3ea', '#07d3ea']
  };

  valorPPM: number; // numero de valores

  constructor(protected servicio: ServicioAplicacion) {

    this.fechaf = new Date();
    this.fechai = new Date();
    this.fechai.setDate(this.fechaf.getDate() - 2);
    this.valorPPM = 5;
    this.view = [this.lineaAncho, this.lineaAlto];
    this.viewTemp = [this.tempAncho, this.tempAlto];
    
  }

  ngOnInit() {

    this.servicio.solicitarTodasTemperaturas()
      .subscribe(graficas => this.cargarEstadisticaTemperatura(graficas));
     IntervalObservable.create(this.VENTANAACTUALIZACION)
       .subscribe(res => this.servicio.solicitarMonoxidoActualBD().subscribe(monoxido => this.cargarEstadisticaMonoxido(monoxido)));

  }

  cambiandoIntervalo() {
    this.fechai = new Date(this.fechai);
    this.fechaf = new Date(this.fechaf);
    this.fechai.setDate(this.fechai.getDate() - 1);
    this.fechaf.setDate(this.fechaf.getDate() + 1);

    console.log(this.fechai);
    console.log(this.fechaf);


    this.servicio.solicitarTodasTemperaturas().subscribe(graficas => this.cargarEstadisticaTemperatura(graficas));
  }

  onSelect(event) {
    console.log(event);
  }

  agregarValor() {
    let lista = this.Lineasingle;
    this.Lineasingle = [];
    const hoy = new Date().getHours().toString() + ':' + new Date().getMinutes().toString() + ':' + new Date().getSeconds().toString();
    lista[0].series.push({ 'name': hoy, 'value': this.valorPPM });
    this.Lineasingle.push(lista[0]);
    

  }

  cargarEstadisticaTemperatura(g: GraficaTemperatura[]) {
 

    this.multi = [];
    let graficoProcesado = [];
    let seriesProcesado = [];
    
    if (this.fechai && this.fechaf) {
      g = g.filter(l => {
        let fecha = new Date(l.fecha);
 

        if (fecha >= this.fechai && fecha <= this.fechaf) {
          return true;
        } else {
          return false;
        }
      });
    }

 



    g.sort((a, b) => {
      if (a.fecha < b.fecha) {
        return -1;
      } else {
        if (a.fecha > b.fecha) {
          return 1;
        } else {
          return 0;
        }
      }
    });



    g.forEach(columna => {
      columna.series.forEach(s => {
        seriesProcesado.push({ 'name': s.hora, 'value': s.valor });
      });
      console.log(seriesProcesado);

      // Formula de agustin parseInt(a.split(':')[0])*100 + parseInt(a.split(':')[1])
      seriesProcesado.sort((a, b) => {
        // tslint:disable-next-line:radix
        const x = parseInt(a.name.split(':')[0]) * 100 + parseInt(a.name.split(':')[1]);
        // tslint:disable-next-line:radix
        const y = parseInt(b.name.split(':')[0]) * 100 + parseInt(b.name.split(':')[1]);

        if (x < y) {
          return -1;
        } else {
          if (x > y) {
            return 1;
          } else {
            return 0;
          }
        }
      });

      console.log(seriesProcesado);



      // tslint:disable-next-line:radix
      let seriesProcesado2 = [];

      let horaAnterior = undefined;
      seriesProcesado.forEach(s => {

        let hora = parseInt(s.name.split(':')[0]);
        if (hora !== horaAnterior) {
          // tslint:disable-next-line:radix
          let agrupados = seriesProcesado.filter(x => hora === parseInt(x.name.split(':')[0]));
          let media = 0;
          agrupados.forEach(a => {
            media = a.value + media;
          });
          
          let promedio = media / agrupados.length;
          let nombreHoraAlmacenar = parseInt(s.name.split(':')[0]) + ':00';
          seriesProcesado2.push({ 'name': nombreHoraAlmacenar, 'value': promedio });

          horaAnterior = hora;
        }
      });
      graficoProcesado.push({ 'name': columna.fecha, 'series': seriesProcesado2 });
    });

    // graficoProcesado tiene toda la grafica.
    let t = [];
    let r = [];
    graficoProcesado.forEach(c => {
      t = c.series.map(s => s);
      r = r.concat(t);
    });


    let colDefecto = { 'name': 'Medias por hr', series: [] };
    for (let i = 0; i < 24; i++) {
      let cantidad = 0;

      let filtro = r.filter(a => {
        return a.name === i.toString() + ':00';
      });

      filtro = filtro.map(a => a.value);

      if (filtro.length > 0) {
        const suma = filtro.reduce((a, b) => {
          return a + b;
        });

        let valor;
        if (filtro.length > 0) {
          valor = suma / filtro.length;
        } else {
          valor = 'No hay datos';
        }

        colDefecto.series.push({ 'name': i.toString() + ':00', 'value': valor });
      }

    }

    graficoProcesado.unshift(colDefecto);
    // se agrega en la primera posicion

    

    this.multi = graficoProcesado;
  }

  cargarEstadisticaMonoxido(m: Monoxido) {
    if (m !== null) {
      let linea = this.Lineasingle;
      this.Lineasingle = [];
      linea[0].name = 'Monoxido';
      if (linea[0].series.length >= this.valorPPM) {

        linea[0].series.shift();
      }
      let iguales = linea[0].series.filter(s => s.name === m.hora);
      if (iguales.length === 0) {
        linea[0].series.push({ 'name': m.hora, 'value': m.valor });

      }
      this.Lineasingle.push(linea[0]);

    }
  }



  cambiarTamanio() {
    this.view = [this.lineaAncho, this.lineaAlto];
  }


  cambiarTamanioTemp() {
    this.viewTemp = [this.tempAncho, this.tempAlto];
  }
}
