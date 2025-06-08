import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExamModalComponent } from './modal/exam-modal.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { ExamService } from '../../../../services/model/exam.service';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatTableModule
  ]
})
export class ExamsComponent {
  exams: any[] = [];

  constructor(private dialog: MatDialog, private examsService: ExamService) {}

  ngOnInit(): void {
    this.examsService.getExams().subscribe(data => {
      this.exams = data as any[];
    });
  }

  openAddExamModal() {
    const dialogRef = this.dialog.open(ExamModalComponent, {
      width: '400px',
      data: { type: 'add', title: 'İmtahan Əlavə Et', exam: { name: '', date: '', maxScore: 100, description: '' } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.exam) {
        this.examsService.addExam(result.exam).subscribe(data => {
          this.exams.push(data);
        });
      }
    });
  }

  editExam(exam: any) {
    const dialogRef = this.dialog.open(ExamModalComponent, {
      width: '400px',
      data: { type: 'edit', title: 'İmtahanı Redaktə Et', exam: { ...exam } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.exam) {
        this.examsService.updateExam(result.exam).subscribe(data => {
          const index = this.exams.findIndex(e => e.id === exam.id);
          if (index !== -1) {
            this.exams[index] = data;
          }
        });
      }
    });
  }

  deleteExam(id: number) {
    this.examsService.deleteExam(id).subscribe(() => {
      this.exams = this.exams.filter(e => e.id !== id);
    });
  }
} 