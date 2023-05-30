import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitComponent } from './shared/init/init.component';
import { EstadisticaComponent } from './shared/estadistica/estadistica.component';
import { EstadistipoComponent } from './shared/estadistipo/estadistipo.component';
import { EstadisgrupoComponent } from './shared/estadisgrupo/estadisgrupo.component';
import { EstadisgestionComponent } from './shared/estadisgestion/estadisgestion.component';

const routes: Routes = [
  { path: '', component: InitComponent },
  { path: 'estadistica', component: EstadisticaComponent },
  { path: 'estadistipo', component: EstadistipoComponent },
  { path: 'estadisgrupo', component: EstadisgrupoComponent },
  { path: 'estadisgestion', component: EstadisgestionComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
