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

  suggestUserName() {
    const suggestedName = 'Superuser';
  }

/*  onSubmit(form: HTMLFormElement) {
    console.log(form);
  }*/

  onSubmit() {
    console.log(this.formElement)
  }
}
