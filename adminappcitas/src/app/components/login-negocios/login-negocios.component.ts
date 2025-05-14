import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, Form, FormGroup, ValidatorFn, AbstractControl, ValidationErrors, FormGroupDirective, NgForm, FormControl} from '@angular/forms';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { DBNegocioService } from '../../services/dbnegocio.service';


@Component({
  selector: 'app-login-negocios',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [AuthService,DBNegocioService],

  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login-negocios.component.html',
  styleUrls: ['./login-negocios.component.css'],
})
export class LoginNegociosComponent {
  formularioLogin!: FormGroup;
  formularioRegistro!: FormGroup;
  mostrarLogin: boolean = true;

  constructor(private fb: FormBuilder,private auth:AuthService, private dbNegocio:DBNegocioService) {}
  /*
    Revisar el servicio negocios y todo lo relacionado con auth, ya que es lo queda problemas
  */
  ngOnInit() {
   // console.log(this.auth);
    this.formularioLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.formularioRegistro = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      password2: [''],
      telefono: ['', [Validators.required]],
    });
  }

toggleForm(mostrarLogin: boolean): void {
  this.mostrarLogin = mostrarLogin;
}

  validarLogin(): void {
    if (this.formularioLogin.valid) {
      let { email, password } = this.formularioLogin.getRawValue();
      this.dbNegocio.getNegocios().subscribe((negocios) => {
        let negocio = negocios.find((negocio) => negocio.email === email);
        if (negocio) {
          this.auth.login(email, password);
        } else {
          //mostrar algún error (Emergente)
        }
      });
    }
  }

  async validarRegistro(): Promise<void> {
    if (this.formularioRegistro.valid) {
      let { nombre, email, password, telefono } = this.formularioRegistro.getRawValue();
      await this.auth.register(email, password, nombre, telefono);
      let negocio = {
        id: this.auth.getCurrentUser()?.uid,
        nombre: nombre,
        email: email,
        password: password,
        telefono: telefono,
        tipo_negocio: '',
        direccion: '',
      };
      await this.dbNegocio.createNegocio(this.auth.getCurrentUser()?.uid,negocio).then(() => {
        this.auth.login(email, password);
      })
    }
  }
}

