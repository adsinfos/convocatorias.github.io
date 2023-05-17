import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InitComponent } from './shared/init/init.component';
import { ConvocatoriaFilterPipe } from './shared/init/convocatoriafilterpipe';

@NgModule({
  declarations: [
    AppComponent,
    ConvocatoriaFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
