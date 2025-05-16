import { FormularioCreacionCitaComponent } from './../formulario-creacion-cita/formulario-creacion-cita.component';
import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { DbcitasService } from '../../services/dbcitas.service';
import { DBNegocioService } from '../../services/dbnegocio.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  providers: [
    AuthService,
    DBNegocioService
  ],
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  nombreNegocio: string = "Nombre del negocio";
  constructor(public auth: AuthService,private dbNegocio: DBNegocioService) {
  }
  ngOnInit() {
    this.obtenerNombreNegocio();
  }
  obtenerNombreNegocio() {
    let currentUser = this.auth.getCurrentUser();
      if (currentUser) {
        this.dbNegocio.getNegocio(currentUser.uid).subscribe((negocio) => {
          if (negocio && negocio.nombre) {
            this.nombreNegocio = negocio.nombre;
          } else {
            this.nombreNegocio = 'Negocio no encontrado';
          }
        });
      }
    }
}
