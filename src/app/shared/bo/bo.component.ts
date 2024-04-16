import { Component, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DataService } from 'src/app/core/data.service';
import { ActivatedRoute } from '@angular/router';
import { SenseConfiguration } from '../ads/sense/config/sense.configuration';
import { ConvocatoriaFilterPipe } from './convocatoriafilterpipe';
import { Convocatoria } from './convocatoria.interface';



@Component({
  selector: 'app-bo',
  templateUrl: './bo.component.html',
  styleUrls: ['./bo.component.sass']
})
export class BoComponent {
  regresar() {
    window.location.href = "https://infobots.org";
  }
  convocatorias$: Observable<Convocatoria[]> | undefined;
  filter = new FormControl('', { nonNullable: true });
  filter2 = new FormControl('Todos', { nonNullable: true });
  CONVOCATORIAS: Convocatoria[] = [];
  len: number = 0;
  page: number = 1;
  pageSize: number = 10;
  dat: string | null = "";
  public config: any;


  constructor(private activatedRoute: ActivatedRoute, pipe: ConvocatoriaFilterPipe, private dataService: DataService) {
    this.config = {} as SenseConfiguration;

    this.config.tipo = "infeed";
    this.config.dataadclient = "ca-pub-9676834375313066";
    this.config.dataadformat = "fluid";
    this.config.dataadslot = "2686529353";
    this.config.dataadqlayoutkey = "-gc-v+5r-7l-18";
    this.config.style = "display:block";

    this.dat = this.activatedRoute.snapshot.paramMap.get('data') || null;
    if (!(this.dat == "Bienes" || this.dat == "Obras" || this.dat == "Servicios Generales" || this.dat == "Consultoria")) {
      this.dat == "Todos";
    }
    this.filter2 = new FormControl(this.dat == null ? "Todos" : this.dat, { nonNullable: true });
    this.dataService.getJson('assets/convos.json').subscribe(data11 => {
      this.CONVOCATORIAS = data11;

      this.convocatorias$ = combineLatest([
        this.filter.valueChanges.pipe(startWith('')),
        this.filter2.valueChanges.pipe(startWith(this.dat == null ? "Todos" : this.dat))
      ])
        .pipe(
          map(([text1, text2]) => this.search(text1, text2, pipe))
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
  public search(text: string, text2: string, pipe: PipeTransform): Convocatoria[] {
    return this.CONVOCATORIAS.filter((convocatoria) => {
      const term = this.preparar(text.toLowerCase());
      return (
        (pipe.transform(this.preparar(convocatoria.entidad)).includes(term) ||
          this.preparar(convocatoria.entidad.toLowerCase()).includes(term) ||
          pipe.transform(this.preparar(convocatoria.objeto)).includes(term) ||
          this.preparar(convocatoria.objeto.toLowerCase()).includes(term)) &&
        ((text2 != "Todos" && text2 == convocatoria.tipo) || (text2 == "Todos"))
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
  ira(link: string) {
    window.open(link, '_blank');
  }
  compartir(compa: Convocatoria) {
    //compa.compartir = !compa.compartir ;
    console.log(compa);
  }
}
