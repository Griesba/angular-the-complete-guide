import {Component, ComponentFactoryResolver, OnDestroy, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth.service';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {AlertComponent} from '../shared/alert/alert.component';
import {PlaceholderDirective} from '../shared/palceholder/placeholder.directive';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent  implements OnDestroy{
  isLoginMode = true;
  isLoading = false;
  private error: string;
  private closeSubs: Subscription;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective; // @ViewChild will pick the first PlaceHolderDirective in the template

  constructor(private authService: AuthService,
              private route: Router,
              private compoFactoryResolver: ComponentFactoryResolver) {}

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
      this.error = errMsg;
      this.showErrorAlert(errMsg);
      this.isLoading = false;
    });

    ngForm.reset();
  }


  onHandleError () {
    this.error = null;
  }

  private showErrorAlert (errMsg: string) {
    // const alertComp = new AlertComponent(); this wont work,  use component factory instead
    // https://angular.io/guide/dynamic-component-loader
    const alertCmpFactory = this.compoFactoryResolver.resolveComponentFactory(AlertComponent);
    const  hostViewContainerRef = this.alertHost.viewContainerRef; // public attr created in the PlaceholderDirective
    hostViewContainerRef.clear(); // clear everything before rendering something new
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory); // create my component dynamically
    componentRef.instance.message = errMsg;
    this.closeSubs = componentRef.instance.close.subscribe(() => {
      this.closeSubs.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy(): void {
    if (this.closeSubs) {
      this.closeSubs.unsubscribe();
    }
  }
}
