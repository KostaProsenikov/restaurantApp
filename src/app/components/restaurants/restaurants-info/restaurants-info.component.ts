import { Component, OnInit, SimpleChanges, OnChanges, OnDestroy, ViewChild } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant.model';
import { MessageService } from 'primeng/api';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { fadeInOut } from '../../../animations/animation/animation.component';
import * as _ from 'lodash';
import { Paginator } from 'primeng/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rest-info',
  templateUrl: './restaurants-info.component.html',
  styleUrls: ['./restaurants-info.component.scss'],
  animations: [fadeInOut]
})
export class RestaurantsInfoComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('dt', {static: false}) dt: Paginator;

  public currentPage                          = 1;
  public display: boolean                     = false;
  public initialRestaurantsArr: Restaurant[]  = [];
  public initialLoadComplete                  = false;
  public itemsPerPageDropdown: any[]          = [];
  public limit: number                        = 20;
  public loading: boolean                     = false;
  public opinion                              = '';
  public restaurantsArr: Restaurant[]         = [];
  public selectedPerPageDropdown: string      = '';
  public title: string                        = '';
  public totalItems: number                   = 0;
  private isDisabledArr: number[]             = [];
  private createRestSubscr: Subscription;

  constructor(private messageService: MessageService,
              private restaurantsServ: RestaurantsService) {
  }

  public ngOnInit() {
    this.getRestaurantsData();
    this.fillDropdownArray();
  }

  public fillDropdownArray() {
    this.itemsPerPageDropdown = [
      {label: '20', value: {id: 20}},
      {label: '50', value: {id: 50}},
      {label: '100', value: {id: 100}},
    ];
  }

  public checkForm(id: number) {
    const restaurant = this.restaurantsArr.filter((rest: Restaurant) => rest.id === id)[0];
    if (restaurant.title.length && restaurant.opinion.length) {
      this.isDisabledArr = this.isDisabledArr.filter((restId: number) => restId !== id);
    } else {
      this.isDisabledArr.push(restaurant.id);
    }
  }

  public checkDisabled(id: number): boolean {
    if (this.isDisabledArr.includes(id)) {
      return true;
    }
    return false;
  }

  public checkNotTouched(id: number): boolean {
    const currentRest = this.restaurantsArr.filter((rest: Restaurant) => rest.id === id)[0];
    const initialRest = this.initialRestaurantsArr.filter((rest: Restaurant) => rest.id === id)[0];
    if (currentRest.opinion === initialRest.opinion && currentRest.title === initialRest.title) {
      return true;
    }
    return false;
  }

  public deleteRestaurant(id: number) {
    this.restaurantsServ.deleteRestaurant(id).subscribe(
      (data) => this.onSuccessDeleteRestaurant(data, id),
      (err) => this.onError(err)
    );
  }

  private onSuccessDeleteRestaurant(data, id) {
    if (data && data.message) {
      this.restaurantsArr = this.restaurantsArr.filter((rest: Restaurant) => rest.id !== id);
      this.messageService.add({severity: 'success', summary: 'Success', detail: `Successfully deleted restaurant with ${id}!`
      });
    }
  }

  public getRestaurantsData(event?) {
    if (event) {
      this.currentPage = event.page !== undefined ? Number(event.page + 1) : this.currentPage;
      this.limit = event.value !== undefined ? Number(event.value.id) : this.limit;
    }

    this.loading = true;
    this.restaurantsServ.getAllRestaurants(this.currentPage, this.limit).subscribe({
      next: (data: any) => this.onSuccessGetRestaurants(data),
      error: (err)       => this.onError(err)
    });
  }

  private onSuccessGetRestaurants(restData: any) {
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

  public submitUpdateForm(restaurant: Restaurant) {
    this.restaurantsServ.updateRestaurant(restaurant, restaurant.id).subscribe(
      {
        next: (data: any) => this.onSuccessUpdateRestaurant(data),
        error: (err: any) => this.onError(err)
      });
  }

  public submitCreateForm() {
    const validate = this.validateForm();
    if (validate) {
      const createRestObj = {
        title: this.title,
        opinion: this.opinion
      };
      this.createRestSubscr = this.restaurantsServ.createRestaurant(createRestObj).subscribe({
        next:(data) => this.onSuccessCreateRestaurant(data),
        error: (err) => this.onError(err)
    });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in both title and opinion fields!' });
    }
  }

  public showDialog() {
    this.display = true;
  }

  public validateForm() {
    if ((this.title.length < 3) || (this.opinion.length < 4)) {
      return false;
    }
    return true;
  }

  private onSuccessUpdateRestaurant(restaurant: Restaurant) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: `Successfully updated ${restaurant.title}!`
    });
  }

  private onSuccessCreateRestaurant(data: any) {
    this.display = false;
    this.messageService.add({severity: 'success', summary: 'Success',
      detail: `Successfully created ${data.title}!`});
    this.getRestaurantsData();
    this.title = this.opinion = '';
  }

  private onError(err: any) {
    this.messageService.add({severity: 'error', summary: 'Error', detail: err.message});
  }

  public ngOnChanges(_changes: SimpleChanges): void {
  }

  public ngOnDestroy(): void {
    this.createRestSubscr ?? this.createRestSubscr.unsubscribe();
  }

}
