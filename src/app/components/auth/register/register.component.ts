/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from "@angular/core";
import { AuthService} from "../../../services/auth.service";
import {User} from "../../../models/user.model";
import { MessageService} from "primeng/api";
import { Router} from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent {
  username = "";
  email = "";
  password = "";
  passwordConfirmation = "";

  constructor(private authService: AuthService,
              private messageService: MessageService,
              private router: Router) {

  }

  onSubmitRegister() {
    if(this.validateRegisterForm()) {
        const registerObj = {
          name: this.username,
          email: this.email,
          password: this.password,
          password_confirmation: this.passwordConfirmation
      };

      this.authService.register(registerObj).subscribe(
        (data) => this.handleAjaxSuccess(data),
        (err) => this.handleAjaxError(err)
      );
    } else {
      return this.messageService.add({severity: "error", summary: "Error", detail: "Username and Password must be longer than 3 characters!"});
    }
  }

  validateRegisterForm() {
    return this.username.length > 3 && this.password.length > 3;
  }

  handleAjaxSuccess(user: User) {
    this.router.navigateByUrl("/login");
    return this.messageService.add({severity: "success", summary: "Success", detail: "You have been successfully registered!"});
  }

  handleAjaxError(err) {
    return this.messageService.addAll(this.getErrorMessages(err));
  }

  getErrorMessages(err) {
    const validationErrors = err.error.validation_errors;
    const formattedErrors = [];

    for (const [key, values]  of Object.entries(validationErrors)) {
      for (const [k, value] of Object.entries(values)) {
        formattedErrors.push ({severity: "error", summary: "Error", detail: value});
      }
    }
    return formattedErrors;
  }


}
