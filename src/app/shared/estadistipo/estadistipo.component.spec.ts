import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadistipoComponent } from './estadistipo.component';

describe('EstadistipoComponent', () => {
  let component: EstadistipoComponent;
  let fixture: ComponentFixture<EstadistipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadistipoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadistipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
