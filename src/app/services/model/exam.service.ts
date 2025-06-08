import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http: HttpClient) { }

    getExams() {
        return this.http.get('https://localhost:3001/api/Exams');
    }
    addExam(exam: any) {
        return this.http.post('https://localhost:3001/api/Exams', exam);
    }
    updateExam(exam: any) {
    return this.http.put(`https://localhost:3001/api/Exams/${exam.id}`, exam);
    }
    deleteExam(id: number) {
        return this.http.delete(`https://localhost:3001/api/Exams/${id}`);
    }
}
