import { NgModule } from '@angular/core';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RecipeService } from './recipes/recipe.service';
@NgModule({
    providers: [
        RecipeService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
    ]
})
export class CoreModule {
}