import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PersonalitiesService } from '../../../services/model/personalities.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-modal-personalities',
  templateUrl: './modal-personalities.component.html',
  styleUrl: './modal-personalities.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule]
})
export class ModalPersonalitiesComponent {
  personalities: any[] = [];
  selectedPersonality: any;
  
  constructor(
    public dialogRef: MatDialogRef<ModalPersonalitiesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private personalitiesService: PersonalitiesService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.personalitiesService.getPersonalities().subscribe({
      next: (personalities) => {
        this.personalities = personalities;
      },
      error: (error) => {
        console.error('Error loading personalities:', error);
      },
      complete: () => {
        console.log('Personalities loaded successfully');
      }
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onApply(): void {
    if (this.selectedPersonality) {
      this.personalitiesService.applyPersonality(this.selectedPersonality).subscribe({
        next: (response) => {
          this.snackBar.open('Şəxsiyyət tətbiq edildi!', 'Bağla', {
            duration: 3000
          });
          this.dialogRef.close(this.selectedPersonality);
        },
        error: (error) => {
          console.error('Error applying personality:', error);
          this.snackBar.open('Xəta baş verdi!', 'Bağla', {
            duration: 3000
          });
          this.dialogRef.close();
        }
      });
    }
  }

  onSave(): void {
    if (this.selectedPersonality) {
      this.personalitiesService.savePersonality(this.selectedPersonality).subscribe({
        next: (response) => {
          this.snackBar.open('Şəxsiyyət əlavə edildi!', 'Bağla', {
            duration: 3000
          });
          this.dialogRef.close(this.selectedPersonality);
        },
        error: (error) => {
          console.error('Error saving personality:', error);
          this.snackBar.open('Xəta baş verdi!', 'Bağla', {
            duration: 3000
          });
          this.dialogRef.close();
        }
      });
    }
  }
}
  