import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

private myAppurl = 'https://localhost:44379/'
private myApiurl = 'api/Personas/'


  constructor(private http: HttpClient) { }


  getListPersonas(): Observable<any> {
    return this.http.get(this.myAppurl + this.myApiurl);
  }

  deletePersona(id: number): Observable<any> {
    return this.http.delete(this.myAppurl + this.myApiurl + id);
  }

  savePersona(persona: any): Observable<any> {
    return this.http.post(this.myAppurl + this.myApiurl, persona);
  }

  updatePersona(id: number,persona: any): Observable<any> {
    return this.http.put(this.myAppurl + this.myApiurl +  id, persona);
  }

  


}
