import { Pipe, PipeTransform } from '@angular/core';
import { Convocatoria } from './convocatoria.interface';

@Pipe({
  name: 'convocatoriaFilter'
})
export class ConvocatoriaFilterPipe implements PipeTransform {

  transform(convocatorias: Convocatoria[], term: string): Convocatoria[] {
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