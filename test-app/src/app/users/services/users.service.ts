import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../store/models/user.model';
import {environment} from '../../../environments/environment';
import {delay} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users`).pipe(
      delay(1500) //  to show loading state
    );
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`).pipe(
      delay(1500) //  to show loading state
    );
  }
}
