import {NgModule} from '@angular/core';
import {ShoppingListComponent} from './shopping-list.component';
import {ShoppingEditComponent} from './shopping-edit/shopping-edit.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ShoppingListRouterModule} from './shopping-list-router.module';
import {SharedModule} from '../shared/shared.module';
import {LoggingService} from '../logging.service';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [
    RouterModule,
    SharedModule,
    ShoppingListRouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  providers: [LoggingService] // providing LoggingService is risky as this module will be lazily loaded
  // and will create another instance different from the eagerly loaded one
})
export class ShoppingListModule {

}
