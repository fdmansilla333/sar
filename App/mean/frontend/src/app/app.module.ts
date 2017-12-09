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



@NgModule({
  declarations: [
    AppComponent,
    CapturaVideoComponent,
    TablaSensoresComponent,
    TablaInfoComponent,
    PanelInferiorComponent,
    PanelControlComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
   // NgbModule.forRoot(),
  ],
  providers: [TemperaturaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
