import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SpecialityModalComponent } from './modal/speciality-modal.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { SpecialitiesService } from '../../../../services/model/specialities.service';

@Component({
  selector: 'app-specialities',
  templateUrl: './specialities.component.html',
  styleUrls: ['./specialities.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatTableModule
  ]
})
export class SpecialitiesComponent {
  specialities: any[] = [];

  constructor(private dialog: MatDialog, private specialitiesService: SpecialitiesService) {}

  ngOnInit(): void {
    this.specialitiesService.getSpecialities().subscribe(data => {
      this.specialities = data;
    });
  }
  openAddSpecialityModal() {
    const dialogRef = this.dialog.open(SpecialityModalComponent, {
      width: '400px',
      data: { type: 'add', title: 'Uzmanlık Alanı Ekle', speciality: { name: '', description: '' } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.speciality) {
        this.specialitiesService.addSpeciality(result.speciality).subscribe(data => {
          this.specialities.push(data);
        });
      }
    });
  }

  editSpeciality(speciality: any) {
    const dialogRef = this.dialog.open(SpecialityModalComponent, {
      width: '400px',
      data: { type: 'edit', title: 'Uzmanlık Alanı Düzenle', speciality: { ...speciality } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.speciality) {
        this.specialitiesService.updateSpeciality(speciality.id, result.speciality).subscribe(data => {
          const index = this.specialities.findIndex(s => s.id === speciality.id);
          if (index !== -1) {
            this.specialities[index] = data;
          }
        });
      }
    });
  }

  deleteSpeciality(id: number) {
    this.specialitiesService.deleteSpeciality(id).subscribe(() => {
      this.specialities = this.specialities.filter(s => s.id !== id);
    });
  }
} 