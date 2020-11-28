import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('formElement') formElement: NgForm;
  defaultQuestion = 'pet';
  yourResponse: '';
  gender = ['male', 'female'];

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
    console.log(this.formElement)
  }
}
