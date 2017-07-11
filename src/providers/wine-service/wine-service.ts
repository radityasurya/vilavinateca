import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WineService {

  API_URL = 'assets/data/wines.json';
  wines: any;

  constructor(public http: Http) {
  }

  load() {
    if (this.wines) {
      return Promise.resolve(this.wines);
    }
    // Dont have the data yet
    return new Promise(resolve => {
      this.http.get('assets/data/wines.json')
        .map(res => res.json())
        .subscribe(data => {
          this.wines = data;
          this.wines = this.wines.map(function (w) {
            var wine = Object.assign({}, w);
            wine.selected = false;
            wine.ordered = 0;
            return wine;
          });
          resolve(this.wines);
        });
    });
  }

  filterItems(searchTerm) {

    return this.wines.filter((item) => {
      if (searchTerm.length > 0) {
        if (searchTerm.indexOf(item.type.toLowerCase()) > -1) {
          return item.type;
        }
      } else {
        return item.type
      }

    });
  }

}
