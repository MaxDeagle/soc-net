import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor(private http: HttpClient) { }

  getDialogs(): Observable<any> {
    const id = localStorage.getItem('currentUserId');
    return this.http.get(`http://localhost:8000/users/${id}/dialogue`);
  }

  getDialog(userId: string): Observable<any> {
    const currentUserId = localStorage.getItem('currentUserId');
    return this.http.post(`http://localhost:8000/dialogue`, { users: [userId, currentUserId]});
  }

  sendMessage(message: string, dialogId: string) {
    const currentUserId = localStorage.getItem('currentUserId');
    return this.http.put(`http://localhost:8000/dialogue/${dialogId}/messages`, { message, userId: currentUserId });
  }
}
