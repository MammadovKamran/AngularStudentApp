import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  constructor(private http: HttpClient) { }
  getSubjects(): Observable<any> {
    return this.http.get(`https://localhost:3001/api/Subjects`);
  }
  addSubject(subject: any): Observable<any> {
    return this.http.post(`https://localhost:3001/api/Subjects`, subject);
  }
  updateSubject(id: number, subject: any): Observable<any> {
    return this.http.put(`https://localhost:3001/api/Subjects/${id}`, subject);
  }
  deleteSubject(id: number): Observable<any> {
    return this.http.delete(`https://localhost:3001/api/Subjects/${id}`);
  }
}
