import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { DataService } from 'src/app/core/data.service';
import { Estadistica } from './estadistica.interface';
import { BaseChartDirective } from 'ng2-charts';
import { SenseConfiguration } from '../ads/sense/config/sense.configuration';
@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.sass']
})
export class EstadisticaComponent {
  regresar() {
    window.location.href = "https://adsinfo.me";

  }
  title = 'Estadisticas';
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartLegend = true;
  public barChartPlugins = [];
  estadisticas: Estadistica[] = [];
  public configm: any;

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      { data: [], label: 'Convocatorias leidas', backgroundColor: '#426eff' }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  constructor(private dataService: DataService) {
    this.configm = {} as SenseConfiguration;

    this.configm.tipo = "multiple";
    this.configm.dataadclient = "ca-pub-9676834375313066";
    this.configm.dataadformat = "autorelaxed";
    this.configm.dataadslot = "8756238946";
    this.configm.style = "display:block";

    this.dataService.getJson('assets/estadistica.json').subscribe(data => {
      this.estadisticas = data;
      for (let fila of this.estadisticas) {
        this.barChartData.labels?.push(fila.fecha);
        this.barChartData.datasets[0].data.push(Number(fila.cantidad));
        this.chart?.update();
      }
    });
  }

}
