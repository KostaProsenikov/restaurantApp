import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  mainUrl = 'http://localhost:8000/api/';
  apiToken = '';
  headerDict: any;
  requestOptions: any;

  constructor(private http: HttpClient) {
    this.apiToken = 'Bearer ' + localStorage.getItem('token');
  }


  getAllRestaurants(page?: number, limit?: number): Observable<any> {
    this.setApiToken();
    let limitParam = 20;
    let pageParam = 1;
    if (limit) {
      limitParam = limit;
    }
    if (page) {
      pageParam = page;
    }
    const queryPar = new HttpParams().set('page', pageParam.toString()).set('perPage', limitParam.toString());

    return this.http.get(this.mainUrl + 'restaurants', { headers: this.requestOptions, params: queryPar});
  }

  updateRestaurant(restaurant: Restaurant, id: number) {
    this.setApiToken();
    return this.http.post(this.mainUrl + `restaurants/${id}`, restaurant, { headers: this.requestOptions});
  }

  deleteRestaurant(id: number) {
    this.setApiToken();
    return this.http.delete(this.mainUrl + `restaurants/${id}`, { headers: this.requestOptions});
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
