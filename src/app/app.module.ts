import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

// Angular Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { InputTextareaModule } from 'primeng/inputtextarea';

// Font Awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//  Internal Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/navigation/header/header.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { RestaurantsInfoComponent } from './components/restaurants/restaurants-info/restaurants-info.component';
import { ReviewsComponent } from './components/restaurants/reviews/reviews.component';
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    RestaurantsInfoComponent,
    ReviewsComponent,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    DialogModule,
    HttpClientModule,
    FormsModule,
    ToastModule,
    CardModule,
    InputTextModule,
    FontAwesomeModule,
    InputTextareaModule
  ],
  providers: [
    UsersService,
    RestaurantsService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
