import { Component, PipeTransform } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import data from '../../../assets/convos.json';
import { Convocatoria } from './convocatoria.interface';
import { ConvocatoriaFilterPipe } from './convocatoriafilterpipe';
import { DataService } from 'src/app/core/data.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.sass'],
  standalone: true,
  imports: [NgFor, AsyncPipe, ReactiveFormsModule, NgbTypeaheadModule],
  providers: [ConvocatoriaFilterPipe]
})

export class InitComponent {
  convocatorias$: Observable<Convocatoria[]> | undefined;
  filter = new FormControl('', { nonNullable: true });
  CONVOCATORIAS: Convocatoria[] = data;

  constructor(pipe: ConvocatoriaFilterPipe, private dataService: DataService) {
    this.dataService.getJson().subscribe(data11 => {
      console.log("ultimo", data11);
      this.CONVOCATORIAS = data11;
    });
    this.convocatorias$ = this.filter.valueChanges.pipe(
      startWith(''),
      map((text) => this.search(text, pipe)),
    );
  }
  public search(text: string, pipe: PipeTransform): Convocatoria[] {
    return this.CONVOCATORIAS.filter((convocatoria) => {
      const term = text.toLowerCase();
      return (
        pipe.transform(convocatoria.entidad).includes(term) ||
        convocatoria.entidad.toLowerCase().includes(term) ||
        pipe.transform(convocatoria.objeto).includes(term) ||
        convocatoria.objeto.toLowerCase().includes(term)
      );
    });
  }
}
