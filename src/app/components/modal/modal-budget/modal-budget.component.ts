import { StudentsService } from '../../../services/model/students.service';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-budget',
  templateUrl: './modal-budget.component.html',
  styleUrl: './modal-budget.component.scss'
})
export class ModalBudgetComponent {
  budget: number = 0;

  constructor(
    public dialogRef: MatDialogRef<ModalBudgetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private studentsService: StudentsService
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }
  onClose(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.studentsService.setBudget(this.budget).subscribe({
      next: (response) => {
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Error setting budget:', error);
      }
    });
  }
}
