import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingService } from './shopping-list/shopping.service';
import {AppRouterModule} from './app-router.module';
import {RecipeStartComponent} from './recipes/recipe-start/recipe-start.component';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';
import {RecipeService} from './recipes/recipe.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthComponent} from './auth/auth.component';
import {LoadingSpinnerComponent} from './shared/loading-spinner.component';
import {AuthentInterceptorService} from './auth/authent-interceptor.service';
import {AlertComponent} from './shared/alert/alert.component';
import {PlaceholderDirective} from './shared/palceholder/placeholder.directive';
import {RecipeModule} from './recipes/recipe.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective
  ],
  imports: [
    BrowserModule, // BrowserModule is used only once, in other module use CommonModule
    FormsModule,
    AppRouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecipeModule
  ],
  providers: [ShoppingService, RecipeService, {provide: HTTP_INTERCEPTORS, useClass: AuthentInterceptorService, multi: true}],
  bootstrap: [AppComponent],
/*  no need for angular 9 and higher
  entryComponents: [
    AlertComponent
  ]*/
})
export class AppModule { }
