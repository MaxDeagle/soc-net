import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(): Observable<any> {
    const email = localStorage.getItem('email');
    return this.http.get(`http://localhost:8000/users/${email}`);
  }

  uploadAvatar(data): Observable<any> {
    const email = localStorage.getItem('email');
    console.log(data);
    return this.http.post(`http://localhost:8000/users/${email}/upload-avatar`, data, {
      reportProgress: true,
      observe: 'events'
    });
  }

  getDialogs(): Observable<any> {
    const id = localStorage.getItem('id');
    return this.http.get(`http://localhost:8000/users/${id}/dialogue`);
  }
}
