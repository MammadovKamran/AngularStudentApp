import { Component, Inject, OnInit } from '@angular/core';
import { ExamSubjectsService } from '../../../services/model/exam-subjects.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-modal-subjects',
  templateUrl: './modal-subjects.component.html',
  styleUrl: './modal-subjects.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class ModalSubjectsComponent implements OnInit {
  selectedSubject: any;
  examSubjects: any[] = [];
  interestSubjects: any[] = [];

  constructor(
    private subjectsService: ExamSubjectsService,
    public dialogRef: MatDialogRef<ModalSubjectsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadSubjects();
  }

  loadSubjects(): void {
    this.subjectsService.getExamSubjects().subscribe((subjects) => {
      this.examSubjects = subjects.map(subject => ({
        ...subject,
        score: null,
        added: false
      }));
    });
    this.subjectsService.getInterestSubjects().subscribe((subjects) => {
      this.interestSubjects = subjects;
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  toggleSubject(subject: any): void {
    if (subject.selected) {
      // Remove interest subject
      this.subjectsService.removeInterestSubject(subject).subscribe({
        next: () => {
          subject.selected = false;
          this.snackBar.open('Fənn silindi!', 'Bağla', { duration: 3000 });
        },
        error: (error) => {
          console.error('Error removing subject:', error);
          this.snackBar.open('Xəta baş verdi!', 'Bağla', { duration: 3000 });
        }
      });
    } else {
      // Add interest subject
      this.subjectsService.addInterestSubject(subject).subscribe({
        next: () => {
          subject.selected = true;
          this.snackBar.open('Fənn əlavə edildi!', 'Bağla', { duration: 3000 });
        },
        error: (error) => {
          console.error('Error adding subject:', error);
          this.snackBar.open('Xəta baş verdi!', 'Bağla', { duration: 3000 });
        }
      });
    }
  }

  addExam(exam: any): void {
    if (!exam.score) {
      this.snackBar.open('Bal daxil edin!', 'Bağla', { duration: 3000 });
      return;
    }

    this.subjectsService.addExamSubject(exam).subscribe({
      next: () => {
        exam.added = true;
        this.snackBar.open('İmtahan əlavə edildi!', 'Bağla', { duration: 3000 });
      },
      error: (error) => {
        console.error('Error adding exam:', error);
        this.snackBar.open('Xəta baş verdi!', 'Bağla', { duration: 3000 });
      }
    });
  }

  removeExam(exam: any): void {
    this.subjectsService.removeExamSubject(exam).subscribe({
      next: () => {
        exam.added = false;
        exam.score = null;
        this.snackBar.open('İmtahan silindi!', 'Bağla', { duration: 3000 });
      },
      error: (error) => {
        console.error('Error removing exam:', error);
        this.snackBar.open('Xəta baş verdi!', 'Bağla', { duration: 3000 });
      }
    });
  }
}
