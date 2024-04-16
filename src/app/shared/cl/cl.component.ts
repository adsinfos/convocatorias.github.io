import { Component, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DataService } from 'src/app/core/data.service';
import { ActivatedRoute } from '@angular/router';
import { SenseConfiguration } from '../ads/sense/config/sense.configuration';
import { ConvoChileFilterPipe } from './chilefilterpipe';
import { Convocl } from './licitacionchile.interface';
2
@Component({
  selector: 'app-cl',
  templateUrl: './cl.component.html',
  styleUrls: ['./cl.component.sass']
})
export class ClComponent {


  convocatorias$: Observable<Convocl[]> | undefined;
  filter = new FormControl('', { nonNullable: true });
  CONVOCATORIAS: Convocl[] = [];
  len: number = 0;
  page: number = 1;
  pageSize: number = 10;
  public config: any;

  regresar() {
    window.location.href = "https://infobots.org";
  }

  constructor(private activatedRoute: ActivatedRoute, pipe: ConvoChileFilterPipe, private dataService: DataService) {
    this.config = {} as SenseConfiguration;

    this.config.tipo = "infeed";
    this.config.dataadclient = "ca-pub-9676834375313066";
    this.config.dataadformat = "fluid";
    this.config.dataadslot = "2686529353";
    this.config.dataadqlayoutkey = "-gc-v+5r-7l-18";
    this.config.style = "display:block";


    this.dataService.getJson('assets/convocl.json').subscribe(data11 => {
      this.CONVOCATORIAS = data11;

      this.convocatorias$ = this.filter.valueChanges.pipe(
        startWith(''),
        map((text) => this.search(text, pipe)),
      );
      this.convocatorias$.forEach(evento => {
        Object.defineProperty(evento, 'show', {
          value: false,
          writable: true,
          enumerable: true,
          configurable: true
        });
      });
      this.convocatorias$.subscribe(array => {
        this.len = array.length;
      });
    });

  }

  public search(text: string, pipe: PipeTransform): Convocl[] {
    return this.CONVOCATORIAS.filter((convocatoria) => {
      const term = this.preparar(text.toLowerCase());
      return (
        (pipe.transform(this.preparar(convocatoria.responsables)).includes(term) ||
          this.preparar(convocatoria.responsables.toLowerCase()).includes(term) ||
          pipe.transform(this.preparar(convocatoria.title)).includes(term) ||
          this.preparar(convocatoria.title.toLowerCase()).includes(term) ||
          pipe.transform(this.preparar(convocatoria.description)).includes(term) ||
          this.preparar(convocatoria.description.toLowerCase()).includes(term)
        )
      );
    });
  }

  public preparar(texto: string) {
    let aux: string;
    console.log("textito:",texto);
    aux = texto.toLowerCase().replace("á", "a");
    aux = aux.replace("é", "e");
    aux = aux.replace("í", "i");
    aux = aux.replace("ó", "o");
    aux = aux.replace("ú", "u");
    return aux;
  }

  ira(link: string) {
    window.open(link, '_blank');
  }
}
