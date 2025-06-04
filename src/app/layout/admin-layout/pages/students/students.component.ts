import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { StudentModalComponent } from './student-modal.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


@Component({
  selector: 'app-admin-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  standalone:true,
  imports:[CommonModule,MatDialogModule,MatFormFieldModule,MatInputModule,FormsModule,MatIconModule,
      MatButtonModule,MatTooltipModule,MatTableModule,MatPaginatorModule,MatSortModule,MatIconModule
  ]
})
export class StudentsComponent {
  students = [
    { id: 1, name: 'Ali Veli', group: 'A', budget: 1000 },
    { id: 2, name: 'Ayşe Yılmaz', group: 'B', budget: 1200 },
    { id: 3, name: 'Mehmet Can', group: 'A', budget: 900 }
  ];

  constructor(private dialog: MatDialog) { }

  openAddStudentModal() {
    const dialogRef = this.dialog.open(StudentModalComponent, {
      width: '400px',
      data: { type: 'add', title: 'Add Student', student: { name: '', group: '', budget: 0 } }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.student) {
        // Öğrenci ekle
        this.students.push({
          id: this.students.length + 1,
          ...result.student
        });
      }
    });
  }

  editStudent(student: any) {
    const dialogRef = this.dialog.open(StudentModalComponent, {
      width: '400px',
      data: { type: 'edit', title: 'Edit Student', student: { ...student } }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.student) {
        // Öğrenci güncelle
        const idx = this.students.findIndex(s => s.id === student.id);
        if (idx > -1) this.students[idx] = { ...student, ...result.student };
      }
    });
  }

  deleteStudent(id: number) {
    this.students = this.students.filter(s => s.id !== id);
  }

  openGroupModal(student: any) {
    this.dialog.open(StudentModalComponent, {
      width: '400px',
      data: { type: 'group', title: 'Assign Group', student }
    });
  }

  openBudgetModal(student: any) {
    this.dialog.open(StudentModalComponent, {
      width: '400px',
      data: { type: 'budget', title: 'Update Budget', student }
    });
  }

  openSubjectModal(student: any) {
    this.dialog.open(StudentModalComponent, {
      width: '400px',
      data: { type: 'subject', title: 'Manage Subjects', student }
    });
  }

  openExamModal(student: any) {
    this.dialog.open(StudentModalComponent, {
      width: '400px',
      data: { type: 'exam', title: 'Manage Exams', student }
    });
  }

  openPersonalityModal(student: any) {
    this.dialog.open(StudentModalComponent, {
      width: '400px',
      data: { type: 'personality', title: 'Manage Personality', student }
    });
  }
} 