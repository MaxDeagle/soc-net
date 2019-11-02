import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor(private http: HttpClient) { }

  getDialogs(): Observable<any> {
    const id = localStorage.getItem('id');
    return this.http.get(`http://localhost:8000/users/${id}/dialogue`);
  }
}
