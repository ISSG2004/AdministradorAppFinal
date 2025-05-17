import { FormularioCreacionCitaComponent } from './../formulario-creacion-cita/formulario-creacion-cita.component';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { DbcitasService } from '../../services/dbcitas.service';
import { DBNegocioService } from '../../services/dbnegocio.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';


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
    RouterModule,
    CommonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  nombreNegocio: string = "Nombre del negocio";
  mq600: boolean = false;
  private destroy$ = new Subject<void>();
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(public auth: AuthService,private dbNegocio: DBNegocioService, private breakpointObserver: BreakpointObserver,) {
    this.breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.mq600 = result.matches;
    });
  }
  ngOnInit() {
    this.obtenerNombreNegocio();
    this.breakpointObserver
      .observe(['(max-width: 600px)'])
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.mq600 = result.matches;
      });
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
    togleMenu() {
      this.sidenav.toggle();
      if(this.sidenav.opened){
        //ocultar el boton del menu
      }else{
        //mostrar el boton del menu
      }

    }
}
