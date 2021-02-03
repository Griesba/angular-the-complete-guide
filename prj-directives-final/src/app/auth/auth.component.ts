import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  private error: string;

  constructor(private authService: AuthService, private route: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(ngForm: NgForm) {
    this.isLoading = true;
    if (!ngForm.valid) { return false; }
    const email = ngForm.value.email;
    const password = ngForm.value.password;
    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.logIn(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe(resData => {
      console.log(resData);
      this.isLoading = false;
      this.route.navigate(['/recipes']);
    }, errMsg => {
      console.log(errMsg);
      this.error = errMsg;
      this.isLoading = false;
    });

    ngForm.reset();
  }
}
