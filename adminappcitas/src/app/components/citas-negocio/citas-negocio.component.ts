import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Cita } from '../../models/Cita';
import { DbcitasService } from '../../services/dbcitas.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-citas-negocio',
  imports: [MatTableModule],
  providers: [DbcitasService,AuthService],
  standalone: true,
  templateUrl: './citas-negocio.component.html',
  styleUrl: './citas-negocio.component.css'
})
export class CitasNegocioComponent {
  displayedColumns: string[] = ['id', 'fecha_cita', 'estado', 'usuario_id', 'negocio_id'];
  citas: Cita[] = []
  constructor(private dbCitas: DbcitasService,private auth:AuthService) {}
  ngOnInit() {
    this.cargarCitas();
  }
  cargarCitas() {
  let user = this.auth.getCurrentUser();
  console.log('User UID:', user?.uid);
  if (user?.uid) {
    this.dbCitas.getCitas(user.uid).subscribe((data: Cita[]) => {
      console.log('Citas recibidas:', data);
      this.citas = data;
    });
  } else {
    console.log('Usuario no autenticado');
  }
}

}
