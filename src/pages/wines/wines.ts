import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, PopoverController, Events } from 'ionic-angular';
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
  public selectedCountry: any = "Spain";
  public availableRegions: any;
  public availableProvinces: any;
  public winesType: string = "";

  @ViewChild('unitPopup') UnitPopupPage: UnitPopupPage;

  constructor(public navCtrl: NavController,
    private wineService: WineService,
    public unitPopupCtrl: PopoverController,
    public events: Events,
    public navParams: NavParams) {

    this.winesType = this.navParams.get('type');

    this.availableRegions = [];
    this.availableProvinces = [];

    this.events.subscribe("order:update", (evt) => { this.getTotalOrder(); this.getTotalPrice(); });
    this.events.subscribe("filter:update", (evt) => { this.getWines(evt); });
  }

  ionViewDidLoad() {
    let country = this.selectedCountry;

    if (this.winesType === 'foreign') {
        country = '';
    }

    this.loadWines(country);
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

  loadWines(country) {
    this.wineService.load(country, this.winesType)
      .then(response => {
        this.wines = response;
        this.getAvailableRegions();
      });
  }

  getAvailableRegions() {
    var temp = [];

    this.wines.forEach(function (wine) {
      if (temp.indexOf(wine.location.region) < 0) {
        console.log(wine.location.region);
        temp.push(wine.location.region);
      }
    });

    this.availableRegions = temp;
  }

  getProvinces(regionName) {

    var provinceList = [];

    this.wines.forEach(function (wine) {
      if (provinceList.indexOf(wine.location.province) < 0) {
        if (wine.location.region === regionName) {
          provinceList.push(wine.location.province);
        }
      }
    });

    return provinceList;
  }

  filterWines(regionName, provinceName) {
    return this.wines.filter(function (wine) {
      if (wine.location.region === regionName && wine.location.province === provinceName) {
        return wine;
      }
    });
  }

  getWines(wineType){
    this.wines = this.wineService.filterItems(wineType);
  }

  select($event, wine) {
      let unitPopup = this.unitPopupCtrl.create(UnitPopupPage, wine, { cssClass: 'custom-popover' });
      unitPopup.present({
        ev: $event
      });

      unitPopup.onDidDismiss((popoverData) => {
        this.getTotalOrder();
        this.getTotalPrice();
      });
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
    wine.ordered = 0;

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
