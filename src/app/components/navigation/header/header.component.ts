import { Component, OnInit } from '@angular/core';
import { faHome, faUtensils, faSignInAlt, faBriefcase, faSignOutAlt, faSearchDollar } from '@fortawesome/free-solid-svg-icons';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  display = false;
  faHome         = faHome;
  faSignInAlt    = faSignInAlt;
  faBriefcase    = faBriefcase;
  faSignOutAlt   = faSignOutAlt;
  faUtensils     = faUtensils;
  faSearchDollar = faSearchDollar;
  faUserTie      = faUserTie;
  user: User;

  constructor() { }

  ngOnInit() {
    this.checkIfLoggedIn();
  }

  showDialog() {
    this.display = !this.display;
  }

  checkIfLoggedIn() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
      console.log('logged in', this.user);
    }
  }

}
