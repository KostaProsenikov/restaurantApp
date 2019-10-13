import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  mainUrl = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }


  login(data): Observable<any> {
    return this.http.post(this.mainUrl + 'login/', data);
  }
}
