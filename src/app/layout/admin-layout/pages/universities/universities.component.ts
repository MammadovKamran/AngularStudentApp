import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UniversityModalComponent } from './modal/university-modal.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { UniversitiesService } from '../../../../services/model/universities.service';

@Component({
  selector: 'app-universities',
  templateUrl: './universities.component.html',
  styleUrls: ['./universities.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatTableModule
  ]
})
export class UniversitiesComponent {
  universities: any[] = [];

  constructor(private dialog: MatDialog, private universitiesService: UniversitiesService) {}

  ngOnInit(): void {
    this.universitiesService.getUniversities().subscribe(data => {
      this.universities = data as any[];
    });
  }

  openAddUniversityModal() {
    const dialogRef = this.dialog.open(UniversityModalComponent, {
      width: '400px',
      data: { type: 'add', title: 'Universitet Əlavə Et', university: { name: '', city: '', description: '' } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.university) {
        this.universitiesService.addUniversity(result.university).subscribe(data => {
          this.universities.push(data);
        });
      }
    });
  }

  editUniversity(university: any) {
    const dialogRef = this.dialog.open(UniversityModalComponent, {
      width: '400px',
      data: { type: 'edit', title: 'Universiteti Redaktə Et', university: { ...university } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.university) {
        this.universitiesService.updateUniversity(result.university).subscribe(data => {
          const index = this.universities.findIndex(u => u.id === university.id);
          if (index !== -1) {
            this.universities[index] = data;
          }
        });
      }
    });
  }

  deleteUniversity(id: number) {
    this.universitiesService.deleteUniversity(id).subscribe(() => {
      this.universities = this.universities.filter(u => u.id !== id);
    });
  }
} 