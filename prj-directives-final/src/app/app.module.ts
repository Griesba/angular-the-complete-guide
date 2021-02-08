import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {ShoppingService} from './shopping-list/shopping.service';
import {AppRouterModule} from './app-router.module';
import {RecipeService} from './recipes/recipe.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthComponent} from './auth/auth.component';
import {AuthentInterceptorService} from './auth/authent-interceptor.service';
import {RecipeModule} from './recipes/recipe.module';
import {ShoppingListModule} from './shopping-list/shopping-list.module';
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core.module';
import {AuthModule} from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    // AuthComponent
    // these component are moved in the sharedModule as the can be declare only once
    // DropdownDirective,
    // LoadingSpinnerComponent,
    // AlertComponent,
    // PlaceholderDirective
  ],
  imports: [
    BrowserModule, // BrowserModule is used only once, in other module use CommonModule
    FormsModule,
    AppRouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecipeModule,
    ShoppingListModule,
    SharedModule, // common component and directive are declared and exported in the SharedModule
    CoreModule,
    AuthModule
  ],
  // providers are in core module. this is optional, and recommended when using service declaration and not Injectable decorator
  // providers: [ShoppingService, RecipeService, {provide: HTTP_INTERCEPTORS, useClass: AuthentInterceptorService, multi: true}],
  bootstrap: [AppComponent],
/*  no need for angular 9 and higher
  entryComponents: [
    AlertComponent
  ]*/
})
export class AppModule { }
