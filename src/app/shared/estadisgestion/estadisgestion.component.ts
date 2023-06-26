import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { DataService } from 'src/app/core/data.service';
import { BaseChartDirective } from 'ng2-charts';
import { EstadisticaTipo } from '../estadistipo/estadistica.tipo.interface';
import { EstadisticaTipoGestion } from './estadisticagestion.interface';
import { SenseConfiguration } from '../ads/sense/config/sense.configuration';

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
  public doughnutChartType: ChartType = 'radar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public estadisticas: EstadisticaTipo[] = [];
  public todo: EstadisticaTipoGestion = { desde: "", datos: [] };
  public doughnutChartLabels: string[] = [];
  public configm: any;

  public doughnutChartOptions: ChartConfiguration<'radar'>['options'] = {
    responsive: true
  };
  public doughnutChartDatasets: ChartConfiguration<'radar'>['data']['datasets'] = [];

  constructor(private dataService: DataService) {
    this.configm = {} as SenseConfiguration;

    this.configm.tipo = "multiple";
    this.configm.dataadclient = "ca-pub-9676834375313066";
    this.configm.dataadformat = "autorelaxed";
    this.configm.dataadslot = "8756238946";
    this.configm.style = "display:block";

    this.dataService.getJson('assets/gestiones.json').subscribe(data => {
      this.todo = data;
      this.estadisticas = this.todo.datos;

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
