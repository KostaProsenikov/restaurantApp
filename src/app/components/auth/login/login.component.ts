import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  rememberMe = false;


  constructor(private messageService: MessageService,
              private authService: AuthService,
              private userService: UsersService,
              private router: Router) { }

  ngOnInit() {
  }

  validateForm() {
    if ((this.username && this.username.length < 3) || (this.password.length && this.password.length < 4)) {
      return false;
    }
    return true;
  }

  onSubmit() {
    const validate = this.validateForm();
    if (validate) {
      const loginObj = {
        email: this.username,
        password: this.password
      };
      this.authService.login(loginObj).subscribe(
        (data) => this.onSuccessGetLoginData(data),
        (err) => this.onError(err)
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in both username and password fields!' });
    }
  }

  onSuccessGetLoginData(data: any) {
    localStorage.setItem('token', data.access_token);
    this.getUserData();
  }

  getUserData() {
    this.userService.getCurrentUser().subscribe(
      (data: any) => this.onSuccessGetUser(data),
      (err) => this.onError(err)
    );
  }

  onSuccessGetUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigateByUrl('/');
    this.userService.refreshNavigationMenu.next(true);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully logged in!' });
  }


  onError(err: any) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Login error! Unauthorized!' });
  }

}
