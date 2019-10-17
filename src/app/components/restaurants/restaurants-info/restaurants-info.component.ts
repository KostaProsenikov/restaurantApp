import { Component, OnInit, SimpleChanges, OnChanges, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant.model';
import { MessageService } from 'primeng/api';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { fadeInOut } from '../../../animations/animation/animation.component';
import * as _ from 'lodash';
import { Paginator } from 'primeng/paginator';

@Component({
  selector: 'app-rest-info',
  templateUrl: './restaurants-info.component.html',
  styleUrls: ['./restaurants-info.component.scss'],
  animations: [fadeInOut]
})
export class RestaurantsInfoComponent implements OnInit, OnChanges, OnDestroy {
  initialRestaurantsArr: Restaurant[]  = [];
  restaurantsArr: Restaurant[]         = [];
  isDisabledArr: number[]              = [];
  currentPage                          = 1;
  limit                                = 20;
  totalItems                           = 0;
  selectedPerPageDropdown: any;
  itemsPerPageDropdown: any[]          = [];
  loading =                           false;
  @ViewChild('dt', {static: false}) dt: Paginator;
  initialLoadComplete = false;
  title = '';
  opinion = '';

  constructor(private messageService: MessageService,
              private restaurantsServ: RestaurantsService) {
  }

  ngOnInit() {
    this.getRestaurantsData();
    this.fillDropdownArray();
  }

  fillDropdownArray() {
    this.itemsPerPageDropdown = [
      {label: '20', value: {id: 20}},
      {label: '50', value: {id: 50}},
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
      this.messageService.add({severity: 'success', summary: 'Success', detail: `Successfully deleted restaurant with ${id}!`
      });
    }
  }

  getRestaurantsData(event?) {

    if (event !== undefined) {
      this.currentPage = event.page !== undefined ? Number(event.page + 1) : this.currentPage;
      this.limit = event.value !== undefined ? Number(event.value.id) : this.limit;
    }

    this.loading = true;
    this.restaurantsServ.getAllRestaurants(this.currentPage, this.limit).subscribe(
      (data: any) => this.onSuccessGetRestaurants(data),
      (err)       => this.onError(err)
    );
  }

  onSuccessGetRestaurants(restData: any) {
    this.initialRestaurantsArr = _.cloneDeep(restData.data);
    this.restaurantsArr = restData.data;
    this.totalItems = restData.total;
    this.loading = false;
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Successfully loaded restaurants!' });
    if (this.initialLoadComplete) {
      this.dt.first = restData.from;
    }
    if (!this.initialLoadComplete) {
      this.initialLoadComplete = true;
    }
  }

  submitForm(restaurant: Restaurant) {
    this.restaurantsServ.updateRestaurant(restaurant, restaurant.id).subscribe(
      (data: any) => this.onSuccessUpdateRestaurant(data),
      (err: any) => this.onError(err)
    );
  }

  submitCreateForm() {
    const validate = this.validateForm();
    if (validate) {
      const createRestObj = {
        title: this.title,
        opinion: this.opinion
      };
      this.restaurantsServ.createRestaurant(createRestObj).subscribe(
        (data) => this.onSuccessCreateRestaurant(data),
        (err) => this.onError(err)
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in both title and password opinion!' });
    }
  }

  validateForm() {
    if ((this.title && this.title.length < 3) || (this.opinion.length && this.opinion.length < 4)) {
      return false;
    }
    return true;
  }

  onSuccessUpdateRestaurant(restaurant: Restaurant) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: `Successfully updated ${restaurant.title}!`
    });
  }

  onSuccessCreateRestaurant(data) {
    this.ngOnInit();
    this.messageService.add({severity: 'success', summary: 'Success', detail: `Successfully created ${data.title}!`
    });
  }

  onError(err: any) {
    this.messageService.add({severity: 'error', summary: 'Error', detail: err.message});
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnDestroy(): void {
  }

}
