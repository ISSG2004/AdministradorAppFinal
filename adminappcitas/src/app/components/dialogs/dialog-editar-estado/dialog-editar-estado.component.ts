import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-editar-estado',
  imports:
  [
    MatButtonModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  standalone: true,
  templateUrl: './dialog-editar-estado.component.html',
  styleUrl: './dialog-editar-estado.component.css'
})
export class DialogEditarEstadoComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogEditarEstadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { estado: string }
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.data.estado.trim());
  }
}
