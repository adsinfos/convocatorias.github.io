import { Component, PipeTransform } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
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
  regresar() {
    window.location.href = "https://adsinfo.me";
  }
  convocatorias$: Observable<Convocatoria[]> | undefined;
  filter = new FormControl('', { nonNullable: true });
  filter2 = new FormControl('', { nonNullable: true });
  filter3 = new FormControl('', { nonNullable: true });
  CONVOCATORIAS: Convocatoria[] = [];

  constructor(pipe: ConvocatoriaFilterPipe, private dataService: DataService) {
    this.dataService.getJson('assets/convos.json').subscribe(data11 => {
      console.log("ultimo", data11);
      this.CONVOCATORIAS = data11;
      this.convocatorias$ = combineLatest([this.filter3.valueChanges, this.filter.valueChanges])
        .pipe(
          startWith(['', '']),
          map(([text1, text2]) => this.search(text1, text2, pipe))
        );
    });

  }
  public search(text: string, text2: string, pipe: PipeTransform): Convocatoria[] {
    return this.CONVOCATORIAS.filter((convocatoria) => {
      const term = text.toLowerCase();
      return (
        pipe.transform(this.preparar(convocatoria.entidad)).includes(term) ||
        this.preparar(convocatoria.entidad.toLowerCase()).includes(term) ||
        pipe.transform(this.preparar(convocatoria.objeto)).includes(term) ||
        this.preparar(convocatoria.objeto.toLowerCase()).includes(term)
      );
    });
  }
  public preparar(texto: string) {
    let aux: string;
    aux = texto.toLowerCase().replace("á", "a");
    aux = aux.replace("é", "e");
    aux = aux.replace("í", "i");
    aux = aux.replace("ó", "o");
    aux = aux.replace("ú", "u");
    return aux;
  }
}
