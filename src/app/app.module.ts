import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { InitComponent } from './shared/init/init.component';
import { ConvocatoriaFilterPipe } from './shared/bo/convocatoriafilterpipe';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EstadisticaComponent } from './shared/estadistica/estadistica.component';
import { NgChartsModule } from 'ng2-charts';
import { EstadistipoComponent } from './shared/estadistipo/estadistipo.component';
import { EstadisgrupoComponent } from './shared/estadisgrupo/estadisgrupo.component';
import { EstadisgestionComponent } from './shared/estadisgestion/estadisgestion.component';

import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { AsyncPipe, NgFor } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgPipesModule  } from 'ngx-pipes';
import { SenseComponent } from './shared/ads/sense/sense.component';
import { BoComponent } from './shared/bo/bo.component';
import { ClComponent } from './shared/cl/cl.component';
import { ConvoChileFilterPipe } from './shared/cl/chilefilterpipe';


@NgModule({
  declarations: [
    AppComponent,
    ConvocatoriaFilterPipe,
    EstadisticaComponent,
    EstadistipoComponent,
    EstadisgrupoComponent,
    EstadisgestionComponent,
    InitComponent,
    SenseComponent,
    BoComponent,
    ClComponent
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
    ShareIconsModule,
    NgFor, AsyncPipe, ReactiveFormsModule, NgbTypeaheadModule, NgPipesModule  
  ],
  providers: [
    HttpClient,
    ConvocatoriaFilterPipe,
    ConvoChileFilterPipe 
  ],
  bootstrap: [AppComponent],
  exports: [
    // otros módulos o componentes
    NgPipesModule
  ]
})
export class AppModule { }
