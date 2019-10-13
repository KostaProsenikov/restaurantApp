import { Component, OnInit } from '@angular/core';
import { faHome, faUtensils, faSignInAlt, faBriefcase, faSignOutAlt, faSearchDollar  } from '@fortawesome/free-solid-svg-icons';

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

  constructor() { }

  ngOnInit() {
  }

  showDialog() {
    this.display = !this.display;
  }

}
