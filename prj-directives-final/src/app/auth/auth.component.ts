import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  private error: string;

  constructor(private authService: AuthService){}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(ngForm: NgForm) {
    this.isLoading = true;
    if (!ngForm.valid) { return false; }
    const email = ngForm.value.email;
    const password = ngForm.value.password;

    this.authService.signUp(email, password).subscribe(resData => {
      console.log(resData);
      this.isLoading = false;
    }, errMsg => {
      console.log(errMsg);
      this.error = errMsg;
      this.isLoading = false;
    });

    ngForm.reset();
  }
}
