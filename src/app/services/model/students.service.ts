import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient) { }

  setBudget(budget: number): Observable<any> {
    return this.http.patch(`https://localhost:3001/api/Students/budget/${budget}`, null);
  }
} 