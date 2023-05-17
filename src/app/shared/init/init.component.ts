import { Component, PipeTransform } from '@angular/core';
import { AsyncPipe, DecimalPipe, NgFor } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import data from '../../../assets/convos.json';

interface Convocatoria {
  cuce: string;
  entidad: string;
  tipo: string;
  modalidad: string;
  objeto: string;
  subasta: string;
  presentacion: string;
  publicacion: string;
  estado: string;
  link: string;
}

const CONVOCATORIAS: Convocatoria[] = data;

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.sass'],
  standalone: true,
  imports: [DecimalPipe, NgFor, AsyncPipe, ReactiveFormsModule, NgbTypeaheadModule],
  providers: [DecimalPipe]
})
export class InitComponent {
	convocatorias$: Observable<Convocatoria[]> | undefined;
	filter = new FormControl('', { nonNullable: true });

	constructor(pipe: DecimalPipe) {
		this.convocatorias$ = this.filter.valueChanges.pipe(
			startWith(''),
			map((text) => this.search(text, pipe)),
		);
	}
  public search(text: string, pipe: PipeTransform): Convocatoria[] {
    return CONVOCATORIAS.filter((convocatoria) => {
      const term = text.toLowerCase();
      return (
        convocatoria.entidad.toLowerCase().includes(term) ||
        pipe.transform(convocatoria.objeto).includes(term) ||
        pipe.transform(convocatoria.cuce).includes(term)
      );
    });
  }
}
