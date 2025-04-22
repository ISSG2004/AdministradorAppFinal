import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreadorCitasComponent } from './creador-citas.component';

describe('CreadorCitasComponent', () => {
  let component: CreadorCitasComponent;
  let fixture: ComponentFixture<CreadorCitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreadorCitasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreadorCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
