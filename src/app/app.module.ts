import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InitComponent } from './shared/init/init.component';
import { ConvocatoriaFilterPipe } from './shared/init/convocatoriafilterpipe';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EstadisticaComponent } from './shared/estadistica/estadistica.component';
import { NgChartsModule } from 'ng2-charts';
import { EstadistipoComponent } from './shared/estadistipo/estadistipo.component';
import { EstadisgrupoComponent } from './shared/estadisgrupo/estadisgrupo.component';

@NgModule({
  declarations: [
    AppComponent,
    ConvocatoriaFilterPipe,
    EstadisticaComponent,
    EstadistipoComponent,
    EstadisgrupoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    NgChartsModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],

})
export class AppModule { }
