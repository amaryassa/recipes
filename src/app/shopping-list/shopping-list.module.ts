import { RouterModule } from '@angular/router';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent
    ],

    imports: [
        FormsModule,
        RouterModule.forChild([
            { path: '', component: ShoppingListComponent }
          ]),
          SharedModule
    ],
    exports: []
})
export class ShoppingListModule { }