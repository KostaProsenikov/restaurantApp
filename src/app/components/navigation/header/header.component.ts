import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { faHome, faUtensils, faSignInAlt, faBriefcase, faSignOutAlt, faSearchDollar } from '@fortawesome/free-solid-svg-icons';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {
  display = false;
  faHome         = faHome;
  faSignInAlt    = faSignInAlt;
  faBriefcase    = faBriefcase;
  faSignOutAlt   = faSignOutAlt;
  faUtensils     = faUtensils;
  faSearchDollar = faSearchDollar;
  faUserTie      = faUserTie;
  user: User;

  constructor(private userService: UsersService,
              private router: Router) { }

  ngOnInit() {
    this.checkIfLoggedIn();
    this.refreshMenuOnChanges();
  }

  showDialog() {
    this.display = !this.display;
  }

  refreshMenuOnChanges() {
    this.userService.refreshNavigationMenu.subscribe(
      data => {
        if (data) {
          this.checkIfLoggedIn();
        }
      }
    );
  }

  checkIfLoggedIn() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  logout() {
    this.userService.logout().subscribe(
      (data: any) => this.onSuccessLogout(data),
      (err: any)  => this.onError(err)
    );
  }

  onError(err) {
    console.log('Error', err.message);
  }

  onSuccessLogout(data) {
    if (data) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.router.navigateByUrl('login');
    }
  }

}
