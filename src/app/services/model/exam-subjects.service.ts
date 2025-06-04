import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExamSubjectsService {

  constructor(private http: HttpClient) { }

  getExamSubjects() {
    return this.http.get<any[]>('https://localhost:3001/api/Exams');
  }

  getInterestSubjects() {
    return this.http.get<any[]>('https://localhost:3001/api/Subjects');
  }

  addInterestSubject(examSubject: any) {
    console.log(examSubject);
    return this.http.post<any>(`https://localhost:3001/api/Students/subject/${examSubject.id}`, examSubject);
  }

  removeInterestSubject(examSubject: any) {
    return this.http.delete<any>(`https://localhost:3001/api/Students/subject/${examSubject.id}`, { body: examSubject });
  }

  addExamSubject(examSubject: any) {
    console.log(examSubject);
    return this.http.post<any>(`https://localhost:3001/api/Students/exam/${examSubject.id}/score/${examSubject.score}`, examSubject);
  }

  removeExamSubject(examSubject: any) {
    return this.http.delete<any>(`https://localhost:3001/api/Students/exam/${examSubject.id}`, { body: examSubject });
  }
}