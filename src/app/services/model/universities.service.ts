import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UniversitiesService {

  constructor(private http: HttpClient) { }

    getUniversities() {
        return this.http.get('https://localhost:3001/api/Universities');
    }
    addUniversity(university: any) {
        return this.http.post('https://localhost:3001/api/Universities', university);
    }
    updateUniversity(university: any) {
        return this.http.put(`https://localhost:3001/api/Universities/${university.id}`, university);
    }
    deleteUniversity(id: number) {
        return this.http.delete(`https://localhost:3001/api/Universities/${id}`);
    }
}
