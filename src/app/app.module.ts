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
import { EstadisgestionComponent } from './shared/estadisgestion/estadisgestion.component';

import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';


@NgModule({
  declarations: [
    AppComponent,
    ConvocatoriaFilterPipe,
    EstadisticaComponent,
    EstadistipoComponent,
    EstadisgrupoComponent,
    EstadisgestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    NgChartsModule,
    ShareButtonsModule.withConfig({
      debug: false,
    }),
    ShareIconsModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],

})
export class AppModule { }
