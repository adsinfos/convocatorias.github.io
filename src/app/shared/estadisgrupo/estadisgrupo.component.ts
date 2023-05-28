import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { DataService } from 'src/app/core/data.service';
import { BaseChartDirective } from 'ng2-charts';
import { EstadisticaTipo } from '../estadistipo/estadistica.tipo.interface';

@Component({
  selector: 'app-estadisgrupo',
  templateUrl: './estadisgrupo.component.html',
  styleUrls: ['./estadisgrupo.component.sass']
})
export class EstadisgrupoComponent {
  title = 'Estadisticas';
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartLegend = true;
  public barChartPlugins = [];
  estadisticas: EstadisticaTipo[] = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  constructor(private dataService: DataService) {
    this.dataService.getJson('assets/estagrupo.json').subscribe(data => {
      this.estadisticas = data;
      let grupos = new Set(this.estadisticas.map(d => d.grupo));
      let fechas = new Set(this.estadisticas.map(d => d.fecha));
      let datosPorGrupoYFecha: { [key: string]: { [key: string]: number } } = {};
      let total: { [key: string]: any } = {};
      for (let grupo of grupos) {
        datosPorGrupoYFecha[grupo] = {};
      }
      for (let dato of this.estadisticas) {
        datosPorGrupoYFecha[dato.grupo][dato.fecha] = Number(dato.cantidad);
      }

      for (let grupo of grupos) {
        let data: number[] = [];
        for (let fecha of fechas) {
          if (datosPorGrupoYFecha[grupo][fecha]) {
            data.push(datosPorGrupoYFecha[grupo][fecha]);
          } else {
            data.push(0);
          }
        }
        total[grupo] = data;
      }
      console.log(total);
      for (let clave in total) {
        this.barChartData.datasets.push({data:total[clave], label:clave, backgroundColor:'#' + Math.floor(Math.random()*16777215).toString(16)});
      }

      this.barChartData.labels = Array.from(fechas);



      this.chart?.update();
    });
  }


}
