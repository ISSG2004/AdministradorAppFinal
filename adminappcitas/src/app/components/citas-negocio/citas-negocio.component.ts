import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { Cita } from '../../models/Cita';
import { DbcitasService } from '../../services/dbcitas.service';
import { AuthService } from '../../services/auth.service';

// Importa tus diálogos
import { DialogEditarEstadoComponent } from '../dialogs/dialog-editar-estado/dialog-editar-estado.component';
import { DialogConfirmarEliminacionComponent } from '../dialogs/dialog-confirmar-eliminacion/dialog-confirmar-eliminacion.component';

@Component({
  selector: 'app-citas-negocio',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [DbcitasService, AuthService],
  templateUrl: './citas-negocio.component.html',
  styleUrls: ['./citas-negocio.component.css']
})
export class CitasNegocioComponent {
  displayedColumns: string[] = ['fecha_cita', 'usuario_id', 'estado', 'acciones'];
  citas: Cita[] = [];

  constructor(
    private dbCitas: DbcitasService,
    private auth: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.cargarCitas();
  }

  cargarCitas() {
    let user = this.auth.getCurrentUser();
    if (user?.uid) {
      this.dbCitas.getCitas(user.uid).subscribe((data: Cita[]) => {
        this.citas = data;
      });
    }
  }

  editarEstado(cita: Cita) {
    const dialogRef = this.dialog.open(DialogEditarEstadoComponent, {
      width: '300px',
      data: { estado: cita.estado }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.trim() !== '') {
        cita.estado = result.trim();
        this.dbCitas.updateCita(cita).then(() => {
          console.log('Estado actualizado');
        }).catch(err => {
          console.error('Error al actualizar estado:', err);
        });
      }
    });
  }

  eliminarCita(cita: Cita) {
    const dialogRef = this.dialog.open(DialogConfirmarEliminacionComponent, {
      width: '300px',
      data: { mensaje: `¿Seguro que quieres eliminar la cita del ${cita.fecha_cita}?` }
    });

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.dbCitas.deleteCita(cita.id).then(() => {
          console.log('Cita eliminada');
        }).catch(err => {
          console.error('Error al eliminar cita:', err);
        });
      }
    });
  }
}
