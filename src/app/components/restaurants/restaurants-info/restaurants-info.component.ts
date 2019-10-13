import { Component, OnInit, SimpleChanges, OnChanges, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { UsersService } from 'src/app/services/users.service';
import { MessageService } from 'primeng/api';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { fadeInOut } from '../../../animations/animation/animation.component';

import * as _ from 'lodash';

@Component({
  selector: 'app-rest-info',
  templateUrl: './restaurants-info.component.html',
  styleUrls: ['./restaurants-info.component.scss'],
  animations: [ fadeInOut ]
})
export class RestaurantsInfoComponent implements OnInit, OnChanges, OnDestroy {
  title = 'Restaurants Review App';
  showAdditionalInfo: boolean;
  currentUser: User;
  initialRestaurantsArr: Restaurant[] = [];
  restaurantsArr:        Restaurant[] = [];
  isDisabledArr:         number[] = [];

  constructor(private userService:     UsersService,
              private messageService:  MessageService,
              private restaurantsServ: RestaurantsService) { }

  ngOnInit() {
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
    if (restaurant.title.length && restaurant.opinion.length) {
      this.isDisabledArr = this.isDisabledArr.filter((restId: number) => restId !== id);
    } else {
      this.isDisabledArr.push(restaurant.id);
    }
  }

  checkDisabled(id: number): boolean {
    if (this.isDisabledArr.includes(id)) {
      return true;
    }
    return false;
  }

  checkNotTouched(id: number): boolean {
    const currentRest = this.restaurantsArr.filter((rest: Restaurant) => rest.id === id)[0];
    const initialRest = this.initialRestaurantsArr.filter((rest: Restaurant) => rest.id === id)[0];
    if (currentRest.opinion === initialRest.opinion && currentRest.title === initialRest.title) {
      return true;
    }
    return false;
  }

  deleteRestaurant(id: number) {
    this.restaurantsServ.deleteRestaurant(id).subscribe(
      (data) => this.onSuccessDeleteRestaurant(data, id),
      (err) => this.onError(err)
    );
  }

  onSuccessDeleteRestaurant(data, id) {
    if (data && data.message) {
      this.restaurantsArr = this.restaurantsArr.filter((rest: Restaurant) => rest.id !== id);
      this.messageService.add({severity: 'success', summary: 'Success', detail: `Successfully deleted restaurant with ${id}!` });
    }
  }

  onSuccessGetRestaurants(data: Restaurant[]) {
    this.initialRestaurantsArr = _.cloneDeep(data);
    this.restaurantsArr        = data;
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Successfully loaded restaurants!' });
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

  onError(err: any) {
    this.messageService.add({severity: 'error', summary: 'Error', detail: err.message });
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnDestroy(): void {
  }

}
