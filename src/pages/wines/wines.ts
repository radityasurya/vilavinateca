import { Component, ViewChild } from '@angular/core';
import { NavController, PopoverController, Events } from 'ionic-angular';
import { WineService } from '../../providers/wine-service/wine-service';
import { MainPage } from '../main/main';
import { UnitPopupPage } from './unit-popup/unit-popup';
import { SettingPage } from '../setting/setting';
import { SearchPage } from '../search/search';
import { QuotationsPage } from '../quotations/quotations';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/reduce';

@Component({
  selector: 'page-wines',
  templateUrl: 'wines.html',
  providers: [WineService]
})
export class WinesPage {

  public wines: any;
  public totalOrder: number = 0;
  public totalPrice: number = 0;
  public searchTerm: string = "";

  public selectedRegion: any = "RIBERA DEL DUERO";

  @ViewChild('unitPopup') UnitPopupPage: UnitPopupPage;

  constructor(public navCtrl: NavController,
    private wineService: WineService,
    public unitPopupCtrl: PopoverController,
    public events: Events) {

    this.events.subscribe("order:update", (evt) => { this.getTotalOrder(); this.getTotalPrice(); });
    this.events.subscribe("filter:update", (evt) => { this.getWines(evt); });
  }

  ionViewDidLoad() {
    this.loadWines();
  }

  checkout() {
    this.navCtrl.push(QuotationsPage);
  }
 
  gotoMain() {
    this.navCtrl.push(MainPage);
  }

  gotoSearchPage() {
    this.navCtrl.push(SearchPage);
  }

  gotoSettingPage() {
    this.navCtrl.push(SettingPage);
  }

  loadWines() {
    this.wineService.load()
      .then(response => {
        this.wines = this.wineService.filterItems(this.searchTerm);
      });
  }

  getWines(wineType){
    this.wines = this.wineService.filterItems(wineType);
  }

  select($event, wine) {
    wine.selected = !wine.selected;

    if (wine.selected) {
      let unitPopup = this.unitPopupCtrl.create(UnitPopupPage, wine, { cssClass: 'custom-popover' });
      unitPopup.present({
        ev: $event
      });

      unitPopup.onDidDismiss((popoverData) => {
        this.getTotalOrder();
        this.getTotalPrice();
      });

    } else {
      wine.ordered = 0;
      this.getTotalOrder();
      this.getTotalPrice();
    }
  }

  order(wine, number) {
    wine.ordered = parseInt(wine.ordered) + parseInt(number);
    wine.selected = true;

    this.getTotalOrder();
    this.getTotalPrice();
  }

  getTotalPrice() {
    this.totalPrice = this.wines.reduce(function (total, w) {
      total += w.price * w.ordered;
      return total;
    }, 0);
  }

  getTotalOrder() {
    this.totalOrder = this.wines.reduce(function (total, w) {
      total = parseInt(total) + parseInt(w.ordered);
      return parseInt(total);
    }, 0);

    console.log(this.totalOrder);
  }

  remove(wine) {
    this.wines.splice(this.wines.indexOf(wine), 1);

    this.getTotalOrder();
    this.getTotalPrice();
  }


  showColor(wineType) {
    var color = "";
    switch (wineType) {
      case 'tinto':
        color = "#ab1123";
        break;
      case 'blanco':
        color = "#e6d2b7";
        break;
      case 'rosado':
        color = "#e63f52";
        break;
      case 'espumoso':
        color = "#e7cc7f";
        break;
      case 'especiales':
        color = "#ff6d37";
        break;
      case 'licores':
        color = "#c8c8c8";
        break;
      case 'varios':
        color = "#051c2c";
        break;
      case 'copas':
        color = "#760229";
        break;
      default:
        break;
    }

    return color;
  }

}
