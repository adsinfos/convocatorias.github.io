import { AfterViewInit, ElementRef, Input, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { SenseConfiguration } from './config/sense.configuration';
import { ScriptService } from 'src/app/core/script.service';

@Component({
  selector: 'sense',
  templateUrl: './sense.component.html',
  styleUrls: ['./sense.component.scss']
})
export class SenseComponent implements AfterViewInit {
  @ViewChild("divcito") divcito?: ElementRef;
  @Input() config!: SenseConfiguration;
  constructor(private scriptservice: ScriptService) {
  }
  ngAfterViewInit() {
    this.scriptservice.executeScript("(adsbygoogle = window.adsbygoogle || []).push({});", this.divcito);
  }
}
