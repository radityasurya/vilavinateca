import { Component } from '@angular/core';
import { NavController, PopoverController, Events} from 'ionic-angular';
import { ConfirmPage } from '../confirm/confirm';
import { QuantityPopupPage } from './quantity-popup/quantity-popup';

@Component({
  selector: 'page-quotations',
  templateUrl: 'quotations.html'
})
export class QuotationsPage {

  wines: any;
  public IVA: any = "21";
  public subTotal: any = 0;
  public IVATotal: any = 0;
  public totalPrice: any = 0;

  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, public events: Events) {
    this.wines = [
      {
        'name': 'Flor Del Pingus',
        'refId': '012 782',
        'price': '51.90',
        'type': 'tinto',
        'quantity': '2',
        'net': '103.8',
        'total': '125.60'
      },
      {
        'name': 'FLOR DEL PINGUS(MAGNUM)',
        'refId': '035 762',
        'price': '103.80',
        'type': 'tinto',
        'quantity': '2',
        'net': '20.60',
        'total': '251.20'
      },
      {
        'name': 'BLANCO PINGUS',
        'refId': '022 722',
        'price': '98.80',
        'type': 'blanco',
        'quantity': '1',
        'net': '98.80',
        'total': '119.55'
      },
      {
        'name': 'LES MORIZOTTES',
        'refId': '052 712',
        'price': '53.80',
        'type': 'espumoso',
        'quantity': '10',
        'net': '538',
        'total': '650.98'
      },
    ];

     this.events.subscribe("quotations:update", (evt) => { this.calculatePrice(evt); });
  }

  goBack() {
    this.navCtrl.pop();
  }

  goConfirmation() {
    this.navCtrl.push(ConfirmPage);
  }

  calculatePrice(wine) {
    wine.net = wine.quantity * wine.price;
    wine.total = wine.net + (wine.net * (this.IVA / 100)); // Apply IVA
    wine.total = wine.total.toFixed(2);
  } 

  calculateTotal() {
    return this.wines.reduce(function (total, w) {
      total = parseInt(total) + parseInt(w.total);
      return parseInt(total);
    }, 0);
  }

  calculateSubTotal() {
    return this.wines.reduce(function (total, w) {
      total = parseInt(total) + parseInt(w.net);
      return parseInt(total);
    }, 0);
  }

  calculateIvaTotal() {
    this.subTotal = this.calculateSubTotal();
    this.totalPrice = this.calculateTotal();

    return this.totalPrice - this.subTotal;
  }

  presentPopover(myEvent, wine) {
    let unitPopup = this.popoverCtrl.create(QuantityPopupPage, wine, { cssClass: 'custom-popover' });
    unitPopup.present({
      ev: myEvent
    });
    unitPopup.onDidDismiss((popoverData) => {
    });
  }

  order(wine, number) {
    wine.quantity = parseInt(wine.quantity) + parseInt(number);
    this.calculatePrice(wine);        
  }

  remove(wine) {
    this.wines.splice(this.wines.indexOf(wine), 1);
    this.calculatePrice(wine);
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
