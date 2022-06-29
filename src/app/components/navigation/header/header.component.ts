import { Component, OnInit } from "@angular/core";
import { faHome, faUtensils, faSignInAlt, faBriefcase, faSignOutAlt, faSearchDollar } from "@fortawesome/free-solid-svg-icons";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { User } from "src/app/models/user.model";
import { UsersService } from "src/app/services/users.service";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
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

  constructor(private userService: UsersService,
              private router: Router) { }

  ngOnInit() {
    this.refreshMenuOnChanges();
    this.checkIfLoggedIn();
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
    if (localStorage.getItem("user")) {
      this.user = JSON.parse(localStorage.getItem("user"));
    }
  }

  isAuthenticated() {
    if (localStorage.getItem("token")) {
      if (!this.user) {
        this.userService.getCurrentUser().subscribe({
          next: (data) => this.onSuccessGetUser(data),
          error: (err)  => this.onError(err)
        });
      }
      return true;
    }
    return false;
  }

  onSuccessGetUser(data) {
    this.user = data;
    localStorage.setItem("user", JSON.stringify(this.user));
  }

  logout() {
    this.userService.logout().subscribe({
     next:(data: any) => this.onSuccessLogout(data),
     error: (err: any)  => this.onError(err)
    });
  }

  onError(err: HttpErrorResponse) {
    console.log("Error", err.message);
  }

  onSuccessLogout(data: any) {
    if (data) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      this.router.navigateByUrl("login");
    }
  }

}
