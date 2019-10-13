import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { RestaurantsInfoComponent } from './components/restaurants/restaurants-info/restaurants-info.component';
import { ReviewsComponent } from './components/restaurants/reviews/reviews.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: RestaurantsInfoComponent},
  {path: 'login',               component: LoginComponent},
  {path: 'register',            component: RegisterComponent},
  {path: 'restaurants',         component: RestaurantsInfoComponent},
  {path: 'reviews',             component: ReviewsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
