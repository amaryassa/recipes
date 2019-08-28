import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput',{static: false}) nameInputRef: ElementRef;
  @ViewChild('amountInput',{static: false}) amountInputRef: ElementRef;
  @Output() ingridientAdded = new EventEmitter<Ingredient>();



  constructor() { }

  ngOnInit() {
  }
  onAddItem(ingrident: Ingredient){
    const ingName =  this.nameInputRef.nativeElement.value ;
    const ingAmount = this.amountInputRef.nativeElement.value ;
    const NewIngrident = new Ingredient(ingName, ingAmount);
    this.ingridientAdded.emit(NewIngrident);
  }

}
