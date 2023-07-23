import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.sass']
})

export class InitComponent {
  dat: any;
  constructor(private router: Router, private activate: ActivatedRoute) {

    this.dat = this.activate.snapshot.paramMap.get('data') || null;
    if ((this.dat == "Bienes" || this.dat == "Obras" || this.dat == "Servicios Generales" || this.dat == "Consultoria")) {
      this.router.navigate(["bo/" + this.dat]);
    } else {
      window.location.href = "http://homecito.adsinfo.me";
    }

  }
}
