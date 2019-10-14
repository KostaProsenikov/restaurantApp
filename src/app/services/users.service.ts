import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  mainUrl = 'http://localhost:8000/api/';
  apiToken = '';
  headerDict: any;
  requestOptions: any;
  refreshNavigationMenu: BehaviorSubject<boolean> = new BehaviorSubject(undefined);

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<any> {
    this.setApiToken();
    return this.http.get(this.mainUrl + 'user/', {headers: this.requestOptions });
  }

  logout(): Observable<any> {
    this.setApiToken();
    return this.http.get(this.mainUrl + 'logout/', {headers: this.requestOptions });
  }

  setApiToken() {
    this.apiToken = 'Bearer ' + localStorage.getItem('token');
    this.headerDict = {
      'Content-Type': 'application/json',
      Authorization: this.apiToken,
    };
    this.requestOptions = new HttpHeaders(this.headerDict);
  }
}
