import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-student-modal',
  templateUrl: 'student-modal.component.html',
  styleUrls: ['./student-modal.component.scss'],
  standalone:true,
  imports:[CommonModule,MatDialogModule,MatFormFieldModule,MatInputModule,FormsModule,MatButtonModule,
    MatIconModule,MatDialogTitle,MatDialogContent,MatDialogActions]
})
export class StudentModalComponent {
  constructor(
    public dialogRef: MatDialogRef<StudentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  save(action?: string): void {
    if (action) {
      this.dialogRef.close({ action, student: this.data.student });
    } else {
      this.dialogRef.close({ student: this.data.student });
    }
  }
} 