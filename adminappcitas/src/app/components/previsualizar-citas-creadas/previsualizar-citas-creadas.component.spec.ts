import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevisualizarCitasCreadasComponent } from './previsualizar-citas-creadas.component';

describe('PrevisualizarCitasCreadasComponent', () => {
  let component: PrevisualizarCitasCreadasComponent;
  let fixture: ComponentFixture<PrevisualizarCitasCreadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrevisualizarCitasCreadasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrevisualizarCitasCreadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
