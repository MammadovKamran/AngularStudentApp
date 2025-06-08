import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SpecialitiesService } from '../../../services/model/specialities.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-specialities',
  templateUrl: './modal-specialities.component.html',
  styleUrl: './modal-specialities.component.scss'
})
export class ModalSpecialitiesComponent {
  selectedSpeciality: any;
  specialities: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<ModalSpecialitiesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private specialitiesService: SpecialitiesService,
    private snackBar: MatSnackBar
  ) {}
  
  onClose() {
    this.dialogRef.close();
  }

  onSave() {
    this.specialitiesService.addSpeciality(this.selectedSpeciality).subscribe({
      next: (response) => {
        this.snackBar.open('Ixtisas əlavə edildi!', 'Bağla', {
          duration: 3000
        });
        this.dialogRef.close();
      },
      error: (error) => {
        this.snackBar.open('Xəta baş verdi!', 'Bağla', {
          duration: 3000
        });
        this.dialogRef.close();
      }
    });
  }

    ngOnInit() {
      this.specialitiesService.getSpecialities().subscribe(specialities => {
        this.specialities = specialities;
      });
    }

}
