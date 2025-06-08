import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SubjectModalComponent } from './modal/subject-modal.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { SubjectsService } from '../../../../services/model/subjects.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatTableModule
  ]
})
export class SubjectsComponent {
  subjects: any[] = [];

  constructor(private dialog: MatDialog, private subjectsService: SubjectsService) {}

  ngOnInit(): void {
    this.subjectsService.getSubjects().subscribe(data => {
      this.subjects = data;
    });
  }

  openAddSubjectModal() {
    const dialogRef = this.dialog.open(SubjectModalComponent, {
      width: '400px',
      data: { type: 'add', title: 'Ders Ekle', subject: { name: '', code: '', description: '' } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.subject) {
        this.subjectsService.addSubject(result.subject).subscribe(data => {
          this.subjects.push(data);
        });
      }
    });
  }

  editSubject(subject: any) {
    const dialogRef = this.dialog.open(SubjectModalComponent, {
      width: '400px',
      data: { type: 'edit', title: 'Ders Düzenle', subject: { ...subject } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.subject) {
        this.subjectsService.updateSubject(subject.id, result.subject).subscribe(data => {
          const index = this.subjects.findIndex(s => s.id === subject.id);
          if (index !== -1) {
            this.subjects[index] = data;
          }
        });
      }
    });
  }

  deleteSubject(id: number) {
    this.subjectsService.deleteSubject(id).subscribe(() => {
      this.subjects = this.subjects.filter(s => s.id !== id);
    });
  }
} 