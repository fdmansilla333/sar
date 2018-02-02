import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { TemperaturaService } from './temperatura.service';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CapturaVideoComponent} from './capturaVideo/capturaVideo.component';
import {TablaSensoresComponent} from './tablaSensores/tablaSensores.component';
import {TablaInfoComponent} from './tablaInfo/tablaInfo.component';
import {PanelControlComponent} from './panelControl/panelControl.component';
import {PanelInferiorComponent} from './panelInferior/panelInferior.component';

import { RouterModule, Routes } from '@angular/router';
import { PizarraComponent } from './pizarra/pizarra.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { EncabezadoComponent } from './encabezado/encabezado.component';

import {NgxChartsModule} from '@swimlane/ngx-charts';

const routes: Routes = [
   { path: '', component: PizarraComponent },
   { path: 'estadisticas', component: EstadisticasComponent },
   { path: 'control', component: PanelInferiorComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CapturaVideoComponent,
    TablaSensoresComponent,
    TablaInfoComponent,
    PanelInferiorComponent,
    PanelControlComponent,
    PizarraComponent,
    EstadisticasComponent,
    EncabezadoComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes),
    NgxChartsModule
  ],
  providers: [TemperaturaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
