import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Events } from 'ionic-angular';

@Component({
  selector: 'page-unit-popup',
  templateUrl: 'unit-popup.html'
})
export class UnitPopupPage {

  public selectedWine: any;

  constructor(private navParams: NavParams, public events: Events) {
  }

  ngOnInit() {
    if (this.navParams.data) {
      this.selectedWine = this.navParams.data;
      console.log(this.selectedWine.ordered);
      if (this.navParams.data.ordered == 0) {
        this.selectedWine.ordered = 6;
      }
      this.events.publish('order:update');
    }
  }

  increase() {
    this.selectedWine.ordered++;
    this.events.publish('order:update');
  }

  decrease() {
    if (this.selectedWine.ordered > 0) {
      this.selectedWine.ordered--;
      this.events.publish('order:update');
    }
  }

  setOrder(nr) {
    this.selectedWine.ordered = parseInt(nr).toFixed(0);
    console.log(this.selectedWine.ordered);
    this.events.publish('order:update');
  }
}
