import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { RestaurantsComponent } from './restaurants/restaurants/restaurants.component';
import { ReviewsComponent } from './restaurants/reviews/reviews.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: RestaurantsComponent},
  {path: 'login',               component: LoginComponent},
  {path: 'register',            component: RegisterComponent},
  {path: 'restaurants',         component: RestaurantsComponent},
  {path: 'reviews',             component: ReviewsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
