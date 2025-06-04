import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpecialitiesService {

  constructor(private http: HttpClient) { }

  getSpecialities() {
    return this.http.get<any[]>('https://localhost:3001/api/Specialities');
  }

  addSpeciality(speciality: any) {
    return this.http.post<any>('https://localhost:3001/api/Specialities', 
      {
        name: speciality.name,
      }
    );
  }
}
