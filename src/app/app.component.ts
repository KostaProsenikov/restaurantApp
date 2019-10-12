import { Component, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { UsersService } from './services/users.service';

import {MessageService} from 'primeng/api';
import { User } from './models/user.model';

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

  constructor(private userService: UsersService,
              private messageService: MessageService) {}

  ngOnInit(): void {
    this.showAdditionalInfo = false;
    this.getUserData();
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

  onSuccessGetUser(data: User) {
    console.log('data', data);
    this.currentUser = data;
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Successfully loaded data!' });
  }

  onError(err: any) {
    console.log('Error, something went wrong', err.message);
    this.messageService.add({severity: 'error', summary: 'Error', detail: err.message });
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnDestroy(): void {
  }

}
