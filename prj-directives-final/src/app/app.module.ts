import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {StoreRouterConnectingModule} from '@ngrx/router-store';

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
import {LoggingService} from './logging.service';

import * as fromApp from './store/app-reducer';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './auth/store/auth.effects';
import {environment} from '../environments/environment.prod';

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
    // registering shoppingListReducer in the StoreModule with key shoppingList
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({logOnly: environment.production}),
    StoreRouterConnectingModule.forRoot(),
    AppRouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    // RecipeModule, now the we are using RecipeModule in lazyloading mode, we remove it here to reduce the size of the app.
    // AuthModule, lazy loaded
    // ShoppingListModule, lazy loaded
    SharedModule, // common component and directive are declared and exported in the SharedModule
    CoreModule
  ],
  // providers are in core module. this is optional, and recommended when using service declaration and not Injectable decorator
  // providers: [ShoppingService, RecipeService, {provide: HTTP_INTERCEPTORS, useClass: AuthentInterceptorService, multi: true}],
  bootstrap: [AppComponent],
  providers: [LoggingService] // providing in the appModule has the same effect than using 'root' @Injectable
/*  no need for angular 9 and higher
  entryComponents: [
    AlertComponent
  ]*/
})
export class AppModule { }
