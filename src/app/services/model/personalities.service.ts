import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonalitiesService {

  constructor(private http: HttpClient) { }

  getPersonalities() {
    return this.http.get<any[]>('https://localhost:3001/api/Personalities');
  }

  savePersonality(personality: any) {
    return this.http.post<any>('http://localhost:3001/api/Personalities', 
      {
        type: personality.type,
      }
    );
  }
  
  applyPersonality(personality: any) {
    return this.http.post<any>('http://localhost:3001/api/Evaluation/personality', 
      {
        personality
      }
    );
  }

}
