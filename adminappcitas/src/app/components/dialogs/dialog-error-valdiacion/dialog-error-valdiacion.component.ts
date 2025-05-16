import { Component, Inject, InjectionToken } from '@angular/core';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-dialog-error-valdiacion',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule
  ],
  templateUrl: './dialog-error-valdiacion.component.html',
  styleUrl: './dialog-error-valdiacion.component.css'
})
export class DialogErrorValdiacionComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogErrorValdiacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  confirmar() {
    this.dialogRef.close(true);
  }
}


