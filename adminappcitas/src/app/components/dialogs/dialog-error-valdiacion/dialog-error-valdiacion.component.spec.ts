import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogErrorValdiacionComponent } from './dialog-error-valdiacion.component';

describe('DialogErrorValdiacionComponent', () => {
  let component: DialogErrorValdiacionComponent;
  let fixture: ComponentFixture<DialogErrorValdiacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogErrorValdiacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogErrorValdiacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
