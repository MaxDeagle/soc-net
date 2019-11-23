import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = {
      email,
      password
    };
    return this.http.post(`http://localhost:8000/login`, body);
  }

  register(email: string, firstName: string, secondName: string, birth: Date, city: string, password: string): Observable<any> {
    const body = {
      email,
      firstName,
      secondName,
      birth,
      city,
      password
    };
    return this.http.post(`http://localhost:8000/register`, body);
  }
}
