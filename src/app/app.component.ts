import { Component, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { UsersService } from './services/users.service';

import {MessageService} from 'primeng/api';
import { User } from './models/user.model';
import { RestaurantsService } from './services/restaurants.service';
import { Restaurant } from './models/restaurant.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges, OnDestroy {
  title = 'restaurantFrontEnd';
  showAdditionalInfo: boolean;
  message: any;
  currentUser: User;
  restaurantsArr: Restaurant[] = [];
  isDisabledArr: number[] = [];

  constructor(private userService: UsersService,
              private messageService: MessageService,
              private restaurantsServ: RestaurantsService) {}

  ngOnInit(): void {
    this.showAdditionalInfo = false;
    this.getUserData();
    this.getRestaurantsData();
  }

  showSomething() {
    this.showAdditionalInfo = !this.showAdditionalInfo;
  }

  getUserData() {
    this.userService.getCurrentUser().subscribe(
      (data: any) => this.onSuccessGetUser(data),
      (err)       => this.onError(err)
    );
  }

  checkForm(id: number) {
    const restaurant = this.restaurantsArr.filter((rest: Restaurant) => rest.id === id)[0];
    console.log('restaurant', restaurant);
    if (restaurant.title.length && restaurant.opinion.length) {
      this.isDisabledArr.push(restaurant.id);
    } else {
      this.isDisabledArr = this.isDisabledArr.filter((restId: number) => restId !== id);
    }
  }

  submitForm(restaurant: Restaurant) {
     this.restaurantsServ.updateRestaurant(restaurant, restaurant.id).subscribe(
       (data: any) => this.onSuccessUpdateRestaurant(data),
       (err: any)  => this.onError(err)
     );
  }

  getRestaurantsData() {
    this.restaurantsServ.getAllRestaurants().subscribe(
      (data: any) => this.onSuccessGetRestaurants(data),
      (err)       => this.onError(err)
    );
  }

  onSuccessUpdateRestaurant(restaurant: Restaurant) {
    this.messageService.add({severity: 'success', summary: 'Success', detail: `Successfully updated ${restaurant.title}!` });
  }

  onSuccessGetUser(data: User) {
    this.currentUser = data;
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Successfully loaded user!' });
  }

  onSuccessGetRestaurants(data: Restaurant[]) {
    this.restaurantsArr = data;
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Successfully loaded restaurants!' });
  }

  onError(err: any) {
    this.messageService.add({severity: 'error', summary: 'Error', detail: err.message });
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnDestroy(): void {
  }

}
