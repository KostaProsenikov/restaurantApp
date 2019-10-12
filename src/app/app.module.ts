import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//  Internal Components
import { HeaderComponent } from './navigation/header/header.component';

// Angular Modules
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from './services/users.service';
import { FormsModule} from '@angular/forms';

// PrimeNG modules
import {ButtonModule} from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { RestaurantsService } from './services/restaurants.service';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    DialogModule,
    HttpClientModule,
    FormsModule,
    ToastModule,
    CardModule,
    InputTextModule
  ],
  providers: [
    UsersService,
    RestaurantsService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
