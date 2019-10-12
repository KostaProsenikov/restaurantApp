import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  mainUrl = 'http://localhost:8000/api/';
  // tslint:disable-next-line: max-line-length
  apiToken = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijg0ZjAwNDQyNDljYzJjZDg5MjNhNDljZGY4NTNhYWIxMWQwNTU5YTBlYWYxZGU5NTU1MGRhYmRhNzAzMWI2YzUyMDZmNTA2NzJmMmY3OTExIn0.eyJhdWQiOiIxIiwianRpIjoiODRmMDA0NDI0OWNjMmNkODkyM2E0OWNkZjg1M2FhYjExZDA1NTlhMGVhZjFkZTk1NTUwZGFiZGE3MDMxYjZjNTIwNmY1MDY3MmYyZjc5MTEiLCJpYXQiOjE1NzA4NjM3NzksIm5iZiI6MTU3MDg2Mzc3OSwiZXhwIjoxNjAyNDg2MTc5LCJzdWIiOiI0Iiwic2NvcGVzIjpbXX0.Y1vIpEhZuckqGivRkaCTHmhjuDO7Pk5Bb2XFe2Y3f0lf91ZNoLOYCp5PAnB1BGDwiuvsGHcw-v7odN72nk5zzl7shpJWXwvbWKP9B7eZuFm6Enl4P9peIwWtVTtDU45BMF4AiQvcTfYI-uSr6TSyE9XLV6pqWXaxGTz0rRhvJaLcOI8A44N-dnqLUBGg2_5og_Ev1eV8mdIf0tacX6YCQGVPvL2led_hgFHU4O0DBtMYksIiWxtOiTyLa3nDJ6mgeKBw2b-qii2P3miBLrbv1zl-Idc_CpL6-09BZDvnba-I-Rym9WU4ItL84UyJGTs5A_ArsMRf2kkTB6kVIXvOqAO-edjQ-2eSO2DB2uaRGPtURVQ_bzrn-Sx5_nG6tqymcVU-IzgVjcKcCkZ4cHYgQWoUDQP0VAcGZBkprAzXnYLDcy39ZXccsv4yJjWqSdCzxsBzJuPmZAjVRInuIhHr0DJKgn7KxBAvpDMIqSp9-P3fNhN-GtGMINx7T_1Ke6HPKjpeloMp9ZLbVHaLWgIkEd5KjBJ1SKfnN3n9CCh3QVEe2YQEGpHY8Z-yklFvm6eumKleoUSoq2k0nY6tp2MUzO3wfxrjoG84Fl8d1ZL3vUETVVszsFN5bvIN9eNwkcXrljr8s1lSDp8W-9mi8HKjrS0VUtM8z69fHipgcaCD6Rs`;

  constructor(private http: HttpClient) { }

  getCurrentUser(): Observable<any> {
    const headerDict = {
      'Content-Type': 'application/json',
      Authorization: this.apiToken,
    };

    const requestOptions = new HttpHeaders(headerDict);

    return this.http.get(this.mainUrl + 'user/', { headers: requestOptions });
  }
}
