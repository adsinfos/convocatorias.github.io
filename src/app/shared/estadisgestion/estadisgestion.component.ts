import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { DataService } from 'src/app/core/data.service';
import { BaseChartDirective } from 'ng2-charts';
import { EstadisticaTipo } from '../estadistipo/estadistica.tipo.interface';

@Component({
  selector: 'app-estadisgestion',
  templateUrl: './estadisgestion.component.html',
  styleUrls: ['./estadisgestion.component.sass']
})
export class EstadisgestionComponent {
  regresar() {
    window.location.href = "https://adsinfo.me";

  }
  title = 'Estadisticas';
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  public doughnutChartType: ChartType = 'doughnut';
  public barChartLegend = true;
  public barChartPlugins = [];
  estadisticas: EstadisticaTipo[] = [];

  public doughnutChartLabels: string[] = [];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true
  };
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [];

  constructor(private dataService: DataService) {
    this.dataService.getJson('assets/gestiones.json').subscribe(data => {
      this.estadisticas = data;
      let grupos = new Set(this.estadisticas.map(d => d.grupo));
      let fechas = new Set(this.estadisticas.map(d => d.fecha));
      let datosPorGrupoYFecha: { [key: string]: { [key: string]: number } } = {};
      let total: { [key: string]: any } = {};
      for (let fecha of fechas) {
        datosPorGrupoYFecha[fecha] = {};
      }
      for (let dato of this.estadisticas) {
        datosPorGrupoYFecha[dato.fecha][dato.grupo] = Number(dato.cantidad);
      }

      for (let fecha of fechas) {
        let data: number[] = [];
        for (let grupo of grupos) {
          if (datosPorGrupoYFecha[fecha][grupo]) {
            data.push(datosPorGrupoYFecha[fecha][grupo]);
          } else {
            data.push(0);
          }
        }
        total[fecha] = data;
      }
      console.log(total);
      for (let clave in total) {
        this.doughnutChartDatasets.push({ data: total[clave], label: clave });
      }

      this.doughnutChartLabels = Array.from(grupos);



      this.chart?.update();
    });
  }


}
