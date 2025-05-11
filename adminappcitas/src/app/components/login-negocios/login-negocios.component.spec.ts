import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginNegociosComponent } from './login-negocios.component';

describe('LoginNegociosComponent', () => {
  let component: LoginNegociosComponent;
  let fixture: ComponentFixture<LoginNegociosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginNegociosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginNegociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
