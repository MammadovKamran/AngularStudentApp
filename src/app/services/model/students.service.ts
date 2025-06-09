import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient) { }
  getStudents(): Observable<any> {
    return this.http.get(`https://localhost:3001/api/Students/api/Students`);
  }
  setBudget(budget: number): Observable<any> {
    return this.http.patch(`https://localhost:3001/api/Students/budget/${budget}`, null);
  }
  updateStudent(id: number, student: any): Observable<any> {
    return this.http.put(`https://localhost:3001/api/Students/${id}`, student);
  }
  addStudent(student: any): Observable<any> {
    return this.http.post(`https://localhost:3001/api/Students`, student);
  }
  groupStudent(id: number): Observable<any> {
    return this.http.patch(`https://localhost:3001/api/Students/group/${id}`, null);
  }
  putSubjectStudent(id: number): Observable<any> {
    return this.http.put(`https://localhost:3001/api/Students/subject/${id}`, null);
  }
  deleteSubjectStudent(id: number): Observable<any> {
    return this.http.delete(`https://localhost:3001/api/Students/subject/${id}`);
  }
  examStudent(id: number, score: number): Observable<any> {
    return this.http.post(`https://localhost:3001/api/Students/exam/${id}/score/${score}`, null);
  }
  deleteExamStudent(id: number): Observable<any> {
    return this.http.delete(`https://localhost:3001/api/Students/exam/${id}`);
  }
  addPersonality(id: number, personality: any): Observable<any> {
    return this.http.post(`https://localhost:3001/api/Students/personality/${id}`, personality);
  }
  deletePersonality(id: number): Observable<any> {
    return this.http.delete(`https://localhost:3001/api/Students/personality/${id}`);
  }
  
  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`https://localhost:3001/api/Students/${id}`);
  }
} 