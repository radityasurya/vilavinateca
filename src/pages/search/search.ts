import { Component, Input, ViewChild, Renderer, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WinesPage } from '../wines/wines';
import { Keyboard } from '@ionic-native/keyboard';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  public renderer: Renderer;
  public elementRef: ElementRef

  @ViewChild('input') myInput;
  constructor(public navCtrl: NavController, public keyboard: Keyboard) {

  }

  ionViewDidEnter() {
   
    
    setTimeout(() => {
      this.myInput.setFocus();
    }, 150);
    this.keyboard.hideKeyboardAccessoryBar(true);
    this.keyboard.disableScroll(true);
  }
  gotoBack() {
    this.navCtrl.pop();
  }
  gotoSearchResult() {
    this.navCtrl.push(WinesPage);
  }
}
