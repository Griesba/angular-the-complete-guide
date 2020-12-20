import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signUpForm: FormGroup;
  forbiddenUsername = ['Anna', 'Maria', 'Tokyo'];

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenUsernameController.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email])
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
  }

  onSumbmit (): void {
    console.log(this.signUpForm);
  }

  addHobby(): void {
    const formControl = new FormControl(null, Validators.required);
    (<FormArray>this.signUpForm.get('hobbies')).push(formControl);
  }

  getControls() {
    return (<FormArray>this.signUpForm.get('hobbies')).controls;
  }

  get controls() {
    // this function has same functionalities with getControls()
    return (this.signUpForm.get('hobbies') as FormArray).controls;
  }

  forbiddenUsernameController (control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsername.indexOf(control.value) > -1) {
      return {'usernameIsForbidden': true};
    }
    return null;
  }

}
