import { Component, OnInit, SimpleChanges, OnChanges, OnDestroy } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant.model';
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
  initialRestaurantsArr: Restaurant[] = [];
  restaurantsArr:        Restaurant[] = [];
  isDisabledArr:         number[]     = [];
  itemsPerPageDropdown:  any[]        = [];
  currentPage                         = 1;
  totalItems                          = 0;
  selectedPerPage: any;
  loading = false;

  constructor(private messageService:  MessageService,
              private restaurantsServ: RestaurantsService) { }

  ngOnInit() {
    this.showAdditionalInfo = false;
    this.getRestaurantsData();
    this.fillDropdownArray();
  }

  showSomething() {
    this.showAdditionalInfo = !this.showAdditionalInfo;
  }

  updateResults(event) {
    const limit = Number(event.value.id);
    this.loading = true;
    this.restaurantsServ.getAllRestaurants(1, limit).subscribe(
      (data: any) => this.onSuccessGetRestaurants(data),
      (err)       => this.onError(err)
    );
  }

  fillDropdownArray() {
    this.itemsPerPageDropdown = [
      {label: '20', value:  {id: 20}},
      {label: '50', value:  {id: 50}},
      {label: '100', value: {id: 100}},
    ];
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

  onSuccessGetRestaurants(restData: any) {
    this.initialRestaurantsArr = _.cloneDeep(restData.data);
    this.restaurantsArr        = restData.data;
    this.totalItems  = restData.total;
    this.currentPage = restData.current_page;
    this.loading = false;
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Successfully loaded restaurants!' });
  }

  submitForm(restaurant: Restaurant) {
     this.restaurantsServ.updateRestaurant(restaurant, restaurant.id).subscribe(
       (data: any) => this.onSuccessUpdateRestaurant(data),
       (err: any)  => this.onError(err)
     );
  }

  getRestaurantsData() {
    this.loading = true;
    this.restaurantsServ.getAllRestaurants(1, 20).subscribe(
      (data: any) => this.onSuccessGetRestaurants(data),
      (err)       => this.onError(err)
    );
  }

  onSuccessUpdateRestaurant(restaurant: Restaurant) {
    this.messageService.add({severity: 'success', summary: 'Success', detail: `Successfully updated ${restaurant.title}!` });
  }

  onError(err: any) {
    this.messageService.add({severity: 'error', summary: 'Error', detail: err.message });
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnDestroy(): void {
  }

}
