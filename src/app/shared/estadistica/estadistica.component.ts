import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { DataService } from 'src/app/core/data.service';
import { Estadistica } from './estadistica.interface';
import { BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.sass']
})
export class EstadisticaComponent {
  title = 'Estadisticas';
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartLegend = true;
  public barChartPlugins = [];
  estadisticas: Estadistica[] = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      { data: [], label: 'Convocatorias leidas', backgroundColor:'#426eff' }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  constructor(private dataService: DataService) {
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
