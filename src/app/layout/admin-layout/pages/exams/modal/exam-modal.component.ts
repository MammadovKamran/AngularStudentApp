import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ExamSubjectsService } from '../../../../../services/model/exam-subjects.service';

@Component({
  selector: 'app-exam-modal',
  templateUrl: './exam-modal.component.html',
  styleUrls: ['./exam-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatSelectModule,
    MatCheckboxModule
  ]
})
export class ExamModalComponent implements OnInit {
  subjects: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<ExamModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private subjectsService: ExamSubjectsService
  ) {}

  ngOnInit() {
    this.loadSubjects();
  }

  loadSubjects() {
    this.subjectsService.getInterestSubjects().subscribe(subjects => {
      this.subjects = subjects;
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close({ exam: this.data.exam });
  }
} 