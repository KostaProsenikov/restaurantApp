import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  mainUrl = 'http://localhost:8000/api/';
  apiToken = '';

  constructor(private http: HttpClient) {
    this.apiToken = 'Bearer ' + localStorage.getItem('token');
   }

  getCurrentUser(): Observable<any> {
    const headerDict = {
      'Content-Type': 'application/json',
      Authorization: this.apiToken,
    };

    const requestOptions = new HttpHeaders(headerDict);

    return this.http.get(this.mainUrl + 'user/', { headers: requestOptions });
  }
}
