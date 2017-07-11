import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Events } from 'ionic-angular';

@Component({
  selector: 'page-quantity-popup',
  templateUrl: 'quantity-popup.html'
})
export class QuantityPopupPage {

  public selectedWine: any;

  constructor(private navParams: NavParams, public events: Events) {
  }

  ngOnInit() {
    if (this.navParams.data) {
      this.selectedWine = this.navParams.data;
    }
  }

  increase() {
    this.selectedWine.quantity++;
    this.events.publish('quotations:update', this.selectedWine);
  }

  decrease() {
    if (this.selectedWine.quantity > 0) {
      this.selectedWine.quantity--;
      this.events.publish('quotations:update', this.selectedWine);

    }
  }

}
