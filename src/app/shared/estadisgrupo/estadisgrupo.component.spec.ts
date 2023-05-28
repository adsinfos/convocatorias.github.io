import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisgrupoComponent } from './estadisgrupo.component';

describe('EstadisgrupoComponent', () => {
  let component: EstadisgrupoComponent;
  let fixture: ComponentFixture<EstadisgrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadisgrupoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadisgrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
