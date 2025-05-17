import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-editar-estado',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './dialog-editar-estado.component.html',
  styleUrls: ['./dialog-editar-estado.component.css'],
})
export class DialogEditarEstadoComponent {
  estados: string[] = ['disponible', 'ocupada', 'finalizada'];
  selectedEstado: string;

  constructor(
    public dialogRef: MatDialogRef<DialogEditarEstadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { estado: string }
  ) {
    // Inicializamos el valor seleccionado con el que venga en data
    this.selectedEstado = data.estado;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.selectedEstado);
  }
}
