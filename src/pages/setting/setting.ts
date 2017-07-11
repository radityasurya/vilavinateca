import { Component, ViewChild } from '@angular/core';
import { NavController, PopoverController, Events } from 'ionic-angular';

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {
  yearValue: any = { lower: 1992, upper: 2008 };
  priceValue: any = { lower: 30, upper: 120 };
  regions: string = "ESCOGER REGIONS";
  public doData: any;
  public typeData: any;
  public countries: any;
  public selectedCountries: any = [];
  public selectedCountriesString: any = "";
  public filterRegions: any = [];

  public filterList: any = [];
  public selectedRegionsString: any = "";

  constructor(public navCtrl: NavController,
    public countryPopupCtrl: PopoverController,
    public events: Events) {
    
    this.initializeData();

    var filter = {
      countries: this.countries,
      type: this.typeData,
      do: this.doData,
      selectedCountriesString: this.selectedCountriesString,
      selectedCountries: this.selectedCountries,
      selectedRegionsString: this.selectedRegionsString,
    }
    this.filterList.push(filter);

  }

  initializeData() {
    this.typeData = [{ 'id': 0, 'name': 'TINTO', 'checked': true },
    { 'id': 1, 'name': 'BLANCO', 'checked': false },
    { 'id': 2, 'name': 'ROSADO', 'checked': false },
    { 'id': 3, 'name': 'ESPUMOSOS', 'checked': true },
    { 'id': 4, 'name': 'ESPECIALES', 'checked': true },
    { 'id': 5, 'name': 'LICORES', 'checked': true },
    { 'id': 6, 'name': 'VARIOS', 'checked': true },
    { 'id': 7, 'name': 'COPAS', 'checked': true }];

    this.countries = [
      {
        "name": "Francia",
        "checked": false,
        "regions": [
          {
            "name": "Todas las regiones",
            "checked": true, 
          },
          {
            "name": "Region 1",
            "checked": false, 
          },
          {
            "name": "Region 2",
            "checked": false, 
          },
          {
            "name": "Region 3",
            "checked": false, 
          }
        ]
      },
      {
        "name": "Espana",
        "regions": [
          {
            "name": "Todas las regiones",
            "checked": true, 
          },
          {
            "name": "Region 1",
            "checked": false, 
          },
          {
            "name": "Region 2",
            "checked": false, 
          },
          {
            "name": "Region 3",
            "checked": false, 
          }
        ],
        "checked": false
      },
      {
        "name": "Portugal",
        "regions": [
          {
            "name": "Todas las regiones",
            "checked": true, 
          },
          {
            "name": "Region 1",
            "checked": false, 
          },
          {
            "name": "Region 2",
            "checked": false, 
          },
          {
            "name": "Region 3",
            "checked": false, 
          }
        ],
        "checked": false
      },
      {
        "name": "Italia",
        "regions": [
          {
            "name": "Todas las regiones",
            "checked": true, 
          },
          {
            "name": "Region 1",
            "checked": false, 
          },
          {
            "name": "Region 2",
            "checked": false, 
          },
          {
            "name": "Region 3",
            "checked": false, 
          }
        ],
        "checked": false
      }
    ];

    this.doData = [
      {
        "name": "DENOMINACION DE ORIGEN 1",
        "checked": false
      },
      {
        "name": "DO NOMBRE X",
        "checked": false
      },
      {
        "name": "DO CORTA",
        "checked": false
      },
      {
        "name": "DENOMINACION DE ORIGEN 4",
        "checked": false
      }
    ];
  }

  gotoBack() {
    this.navCtrl.pop();
  }

  setDoChecked(filter, d) {
    d.checked = !d.checked;
  }

  selectCountry(filter, country) {
    country.checked = !country.checked;

    if (country.checked) {
      filter.selectedCountries.push(country);
      
    } else {
      var index = filter.selectedCountries.indexOf(country);
      if (index > -1) {
        filter.selectedCountries.splice(index, 1);
      }
    }

    filter.selectedCountriesString = filter.selectedCountries.map(function(item) {
      return item.name + " ";
    });
  }

  selectRegion(filter, region) {
    region.checked = !region.checked;

    filter.selectedRegionsString = "ESCOGER REGIONES";
  }

  getCountry(ev, filter) {
    // Reset items back to all of the items
    this.initializeData();

    filter.countries = this.countries;

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      filter.countries = filter.countries.filter((country) => {
        return (country.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  addFilter() {

    this.initializeData();

    var filter = {
      countries: this.countries,
      type: this.typeData,
      do: this.doData,
      selectedCountriesString: "",
      selectedCountries: [],
      selectedRegionsString: "",
    }
    this.filterList.push(filter);
  }

  removeFilter() {
    if (this.filterList.length > 1) {
    this.filterList.pop();

    }
  }

}
