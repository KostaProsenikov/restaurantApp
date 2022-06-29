/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-magic-numbers */
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Restaurant } from "../models/restaurant.model";

@Injectable({
  providedIn: "root"
})
export class RestaurantsService {

  mainUrl = "http://localhost:8000/api/";
  apiToken = "";
  headerDict: any;
  requestOptions: any;

  constructor(private http: HttpClient) {
    this.apiToken = `Bearer ${  localStorage.getItem("token")}`;
  }

  getAllRestaurants(page?: number, limit?: number): Observable<any> {
    this.setApiToken();
    const pageParam = page ? page : 1;
    const limitParam = limit ? limit : 20;
    const queryPar = new HttpParams().set("page", pageParam.toString()).set("limit", limitParam.toString());

    return this.http.get(`${this.mainUrl  }restaurants`, { headers: this.requestOptions, params: queryPar});
  }

  updateRestaurant(restaurant: Restaurant, id: number) {
    this.setApiToken();
    return this.http.post(`${this.mainUrl  }restaurants/${id}`, restaurant, { headers: this.requestOptions});
  }

  createRestaurant(data: any): Observable<any> {
    this.setApiToken();
    return this.http.post(`${this.mainUrl  }restaurants`, data, { headers: this.requestOptions});
  }

  deleteRestaurant(id: number) {
    this.setApiToken();
    return this.http.delete(`${this.mainUrl  }restaurants/${id}`, { headers: this.requestOptions});
  }

  setApiToken() {
    this.apiToken = `Bearer ${  localStorage.getItem("token")}`;
    this.headerDict = {
      "Content-Type": "application/json",
      Authorization: this.apiToken
    };
    this.requestOptions = new HttpHeaders(this.headerDict);
  }

}
