import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmarEliminacionComponent } from './dialog-confirmar-eliminacion.component';

describe('DialogConfirmarEliminacionComponent', () => {
  let component: DialogConfirmarEliminacionComponent;
  let fixture: ComponentFixture<DialogConfirmarEliminacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogConfirmarEliminacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogConfirmarEliminacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
