import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {

  @Input() message: string;
  @Output() closee = new EventEmitter<void>();

  onClose() {
    this.closee.emit();
  }

}


