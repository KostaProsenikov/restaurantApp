import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  mainUrl = 'http://localhost:8000/api/';
  // tslint:disable-next-line: max-line-length
  apiToken = '';

  constructor(private http: HttpClient) {
    this.apiToken = 'Bearer ' + localStorage.getItem('token');
  }


  getAllRestaurants(): Observable<any> {
    const headerDict = {
      'Content-Type': 'application/json',
      Authorization: this.apiToken,
    };

    const requestOptions = new HttpHeaders(headerDict);

    return this.http.get(this.mainUrl + 'restaurants', { headers: requestOptions});
  }

  updateRestaurant(restaurant: Restaurant, id: number) {
    const headerDict = {
      'Content-Type': 'application/json',
      Authorization: this.apiToken,
    };

    const requestOptions = new HttpHeaders(headerDict);

    return this.http.post(this.mainUrl + `restaurants/${id}`, restaurant, { headers: requestOptions});
  }

  deleteRestaurant(id: number) {
    const headerDict = {
      'Content-Type': 'application/json',
      Authorization: this.apiToken,
    };

    const requestOptions = new HttpHeaders(headerDict);

    return this.http.delete(this.mainUrl + `restaurants/${id}`, { headers: requestOptions});
  }

}
