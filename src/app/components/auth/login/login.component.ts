import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

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
              private router: Router) { }

  ngOnInit() {
  }

  validateForm() {
    if (this.username.length < 3 || this.password.length < 5) {
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
        (err)  => this.onError(err)
      );
    } else {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Please fill in both username and password fields!' });
    }
  }

  onSuccessGetLoginData(data: any) {
    localStorage.setItem('token', data.access_token);
    this.router.navigateByUrl('/');
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Successfully logged in!' });
  }

  onError(err: any) {
    this.messageService.add({severity: 'error', summary: 'Error', detail: 'Login error! Unauthorized!' });
  }

}
