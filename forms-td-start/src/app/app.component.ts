import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('formElement') formElement: NgForm;
  @ViewChild('loginFormElement') loginFormElement: NgForm;
  defaultQuestion = 'pet';
  yourResponse: '';
  gender = ['male', 'female'];
  cities = ['paris', 'istanbul', 'tokyo'];
  selectedCity = 'tokyo';
  user = {
    username: '',
    email: '',
    secret: '',
    response: '',
    gender: ''
  };
  submitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    this.formElement.form.patchValue({
      userData: {
        username: suggestedName
      }
    });

    // the drawback of this method is that il will reset the entire form
/*    this.formElement.setValue({
      userData: {
        username: suggestedName,
        email: ''
      },
      secret: ''
    });*/
  }

/*  onSubmit(form: HTMLFormElement) {
    console.log(form);
  }*/

  onSubmit() {
    console.log(this.formElement);
    this.submitted = true;
    this.user.username = this.formElement.value.userData.username;
    this.user.email = this.formElement.value.userData.email;
    this.user.secret = this.formElement.value.secret;
    this.user.response = this.formElement.value.questionAnswer;
    this.user.gender = this.formElement.value.gender;
  }

  onReset() {
    this.formElement.reset();
  }

  onSubmitLogin() {
    console.log(this.loginFormElement.value);

  }
}
