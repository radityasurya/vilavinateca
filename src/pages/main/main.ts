import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WinesPage } from '../wines/wines';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {

  constructor(public navCtrl: NavController) {

  }

  gotoWineListPage(type) {
    this.navCtrl.push(WinesPage, {'type': type});
  }
}
