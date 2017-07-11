import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MainPage } from '../main/main';
@Component({
  selector: 'page-confirm',
  templateUrl: 'confirm.html'
})
export class ConfirmPage {

  public clicked: boolean = false;

  constructor(public navCtrl: NavController) {
    setTimeout(() => {
      if(!this.clicked) {
      this.gotoMapView();
      }
    }, 5000);
  }

  gotoMapView() {
    this.clicked = true;
    this.navCtrl.push(MainPage);
  }
}
