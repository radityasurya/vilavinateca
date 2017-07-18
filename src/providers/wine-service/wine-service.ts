import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WineService {

  API_URL = 'assets/data/wines.json';
  wines: any;

  constructor(public http: Http) {
  }

  load(country, type) {
    if (this.wines) {
      return Promise.resolve(this.wines);
    }

    if (type !== undefined) {
        switch (type) {
            case 'regular':
            this.API_URL = 'assets/data/wines.json';
            break;

            case 'advanced':
            this.API_URL = 'assets/data/winesAdvanced.json';
            break;

            case 'foreign':
            this.API_URL = 'assets/data/winesForeign.json';
            break;
        }
    }

    // Dont have the data yet
    return new Promise(resolve => {
      this.http.get(this.API_URL)
        .map(res => res.json())
        .subscribe(data => {
          this.wines = data;

          this.wines = this.wines.map((w) => {
            w.ordered = 0;
            w.selected = false;
            return w;
          })

          if (country) {
            this.wines = this.wines.filter(function (w) {
              if (w.location.country === country) {
                return w;
              }
            });
          }

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
        return item.type;
      }
    });
  }
}
