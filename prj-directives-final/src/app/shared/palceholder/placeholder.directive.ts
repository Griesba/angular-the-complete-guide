import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appPlaceHolder]'
})
export class PlaceholderDirective {
// used to create component dynamically
  constructor(public viewContainerRef: ViewContainerRef) {}
}
