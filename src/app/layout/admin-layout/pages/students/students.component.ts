import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { StudentModalComponent } from './modal/student-modal.component';
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
import { StudentsService } from '../../../../services/model/students.service';


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
  // students = [
  //   { id: 1, name: 'Kamran',surname:'Məmmədov', group: 'A', budget: 1000 },
  //   { id: 2, name: 'Rəşad', surname:'Məmmədov', group: 'B', budget: 1200 },
  //   { id: 3, name: 'Vəli', surname:'Məmmədov', group: 'A', budget: 900 }
  // ];
  students: any[] = [];

  constructor(private dialog: MatDialog, private studentsService: StudentsService) { }

  ngOnInit(): void {
    this.studentsService.getStudents().subscribe(data => {
      this.students = data;
      console.log(this.students);
      
    });
  }

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
            this.studentsService.updateStudent(student.id, result.student).subscribe(data => {
              console.log(data);
            });
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