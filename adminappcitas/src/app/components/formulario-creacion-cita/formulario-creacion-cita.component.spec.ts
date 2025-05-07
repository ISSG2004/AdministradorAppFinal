import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCreacionCitaComponent } from './formulario-creacion-cita.component';

describe('FormularioCreacionCitaComponent', () => {
  let component: FormularioCreacionCitaComponent;
  let fixture: ComponentFixture<FormularioCreacionCitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioCreacionCitaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioCreacionCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
