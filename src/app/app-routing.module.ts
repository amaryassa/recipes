import { AuthModule } from './auth/auth.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  // {path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},
  // {path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'},
  // {path: 'auth', loadChildren: './auth/auth.module#AuthModule'}
  {path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)},
  {path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule, AuthModule]
})

export class AppRoutingModule { }
