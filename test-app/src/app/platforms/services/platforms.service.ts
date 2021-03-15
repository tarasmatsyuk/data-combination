import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {delay} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Platform, PlatformResponse } from '../store/models/platform.model';

@Injectable({
  providedIn: 'root'
})
export class PlatformsService {

  constructor(
    private http: HttpClient
  ) { }

  getPlatforms(): Observable<PlatformResponse> {
    return this.http.get<PlatformResponse>(`${environment.apiUrl}/platforms`).pipe(
      delay(1000) //  to show loading state
    );
  }

  getPlatform(id: string): Observable<Platform> {
    return this.http.get<Platform>(`${environment.apiUrl}/platforms/${id}`).pipe(
      delay(1000) //  to show loading state
    );
  }
}
