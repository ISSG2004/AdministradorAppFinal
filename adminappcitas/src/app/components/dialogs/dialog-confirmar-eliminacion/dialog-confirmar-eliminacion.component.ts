import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirmar-eliminacion',
  templateUrl: './dialog-confirmar-eliminacion.component.html',
  standalone: true,
  imports: [
    MatButtonModule
  ],
})
export class DialogConfirmarEliminacionComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogConfirmarEliminacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { fecha_cita: string }
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
