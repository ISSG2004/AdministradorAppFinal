import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditarEstadoComponent } from './dialog-editar-estado.component';

describe('DialogEditarEstadoComponent', () => {
  let component: DialogEditarEstadoComponent;
  let fixture: ComponentFixture<DialogEditarEstadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditarEstadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditarEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
