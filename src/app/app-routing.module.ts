import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitComponent } from './shared/init/init.component';
import { EstadisticaComponent } from './shared/estadistica/estadistica.component';
import { EstadistipoComponent } from './shared/estadistipo/estadistipo.component';

const routes: Routes = [
  { path: '', component: InitComponent },
  { path: 'estadistica', component: EstadisticaComponent },
  { path: 'estadistipo', component: EstadistipoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
