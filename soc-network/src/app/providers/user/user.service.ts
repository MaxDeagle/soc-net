import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(id?: string): Observable<any> {
    const userId = id ? id : localStorage.getItem('currentUserId');
    return this.http.get(`http://localhost:8000/getUserById/${userId}`);
  }

  getUsers(): Observable<any> {
    return this.http.get(`http://localhost:8000/users`);
  }

  uploadAvatar(data): Observable<any> {
    const userId = localStorage.getItem('currentUserId');
    return this.http.post(`http://localhost:8000/users/${userId}/upload-avatar`, data, {
      reportProgress: true,
      observe: 'events'
    });
  }

  addFriend(userId: string): Observable<any> {
    const currentUserId = localStorage.getItem('currentUserId');
    const data = { userId };
    return this.http.put(`http://localhost:8000/users/${currentUserId}/add-friend`, data);
  }

  removeFriend(userId: string): Observable<any> {
    const currentUserId = localStorage.getItem('currentUserId');
    const data = { userId };
    return this.http.put(`http://localhost:8000/users/${currentUserId}/remove-friend`, data);
  }

  isFriend(userId: string): Observable<any> {
    const currentUserId = localStorage.getItem('currentUserId');
    const data = { userId };
    return this.http.post(`http://localhost:8000/users/${currentUserId}/is-friend`, data);
  }

  getFriends(): Observable<any> {
    const currentUserId = localStorage.getItem('currentUserId');
    return this.http.get(`http://localhost:8000/users/${currentUserId}/friends`);
  }

  addPageRecord(text: string): Observable<any> {
    const currentUserId = localStorage.getItem('currentUserId');
    const data = { text };
    return this.http.post(`http://localhost:8000/users/${currentUserId}/add-page-record`, data);
  }
}
