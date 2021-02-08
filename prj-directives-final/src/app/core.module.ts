import {NgModule} from '@angular/core';
import {ShoppingService} from './shopping-list/shopping.service';
import {RecipeService} from './recipes/recipe.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthentInterceptorService} from './auth/authent-interceptor.service';


// coreModule is to create a linear providerIn app configuration
@NgModule({
  providers: [ShoppingService, RecipeService, {provide: HTTP_INTERCEPTORS, useClass: AuthentInterceptorService, multi: true}],
})
export class CoreModule { }
