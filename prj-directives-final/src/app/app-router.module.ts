import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {AuthComponent} from './auth/auth.component';

const routes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes', loadChildren: './recipes/recipe.module#RecipeModule'},
  // {path: 'recipes', loadChildren: () => import('./recipes/recipe.module').then( m => m.RecipeModule)}
  {path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'},
  {path: 'auth', loadChildren: './auth/auth.module#AuthModule'}
];
// RouterModule.forRoot(routes) is used only once, dont repeat it on other module. You would be using RouterModule.forChild instead
@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      { preloadingStrategy: PreloadAllModules }) // preload modules when user is idle
  ],
  exports: [RouterModule]
})
export class AppRouterModule {

}
