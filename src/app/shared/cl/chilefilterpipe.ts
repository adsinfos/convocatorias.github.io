import { Pipe, PipeTransform } from '@angular/core';
import { Convocl } from './licitacionchile.interface';

@Pipe({
  name: 'convocatoriaChileFilter',
  pure: true
})
export class ConvoChileFilterPipe implements PipeTransform {

  transform(convocatorias: Convocl[], term: string): Convocl[] {
    if (!convocatorias || !term) {
      return convocatorias;
    }
    term = term.toLowerCase();
    return convocatorias.filter(convocatoria =>
      Object.values(convocatoria).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(term)
      )
    );
  }

}