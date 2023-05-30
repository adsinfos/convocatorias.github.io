import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisgestionComponent } from './estadisgestion.component';

describe('EstadisgestionComponent', () => {
  let component: EstadisgestionComponent;
  let fixture: ComponentFixture<EstadisgestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadisgestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadisgestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
