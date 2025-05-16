import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasNegocioComponent } from './citas-negocio.component';

describe('CitasNegocioComponent', () => {
  let component: CitasNegocioComponent;
  let fixture: ComponentFixture<CitasNegocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitasNegocioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitasNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
