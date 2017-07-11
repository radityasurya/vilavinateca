import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { IdleProvider } from '../providers/idle/idle';
import { HomePage } from '../pages/home/home';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'app.html',
  providers: [IdleProvider]
})
export class MyApp {
  rootPage: any = HomePage;
  types: any;
  currentPage: any = "HomePage";
  selectedType: any = [];

  @ViewChild(Nav) nav: Nav;
  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private screenOrientation: ScreenOrientation,
    private idleProvider: IdleProvider,
    private events: Events) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // Check if the platform is IOS and not desktop/mobileweb
      if (!platform.is('core') && !platform.is('mobileweb') && platform.is('ios')) {

        // set to landscape
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
      }

      this.idleProvider.start();

      // Subscribe to status event
      this.events.subscribe("status:active", (evt) => { this.activate(); });
      this.events.subscribe("status:idle", (evt) => { this.idle(); });

    });

    this.types = [
      { 'name': 'tinto', 'icon': 'assets/image/tinto.png' },
      { 'name': 'blanco', 'icon': 'assets/image/blanco.png' },
      { 'name': 'rosado', 'icon': 'assets/image/rosado.png' },
      { 'name': 'espumoso', 'icon': 'assets/image/espumoso.png' },
      { 'name': 'especiales', 'icon': 'assets/image/especiales.png' },
      { 'name': 'licores', 'icon': 'assets/image/licores.png' },
      { 'name': 'varios', 'icon': 'assets/image/varios.png' },
      { 'name': 'copas', 'icon': 'assets/image/cup.png' }
    ];

    this.types = this.types.map(function (t) {
      var type = Object.assign({}, t);
      type.selected = false;
      return type;
    });
  }

  ngAfterViewInit() {
    this.nav.viewDidEnter.subscribe((view) => {

      if (view.instance.constructor.name !== "HomePage") {
        if (this.idleProvider.status !== "inactive") {
          this.currentPage = view.instance.constructor.name;
        }
      }

    });
  }

  idle() {
    if (this.currentPage !== "HomePage" && this.idleProvider.status === "idle") {
      this.nav.push(HomePage)
    }
  }

  activate() {
    if (this.currentPage !== "HomePage" && this.idleProvider.status === "active") {
      this.nav.pop();
    }
  }

  // tapEvent will reset the Idle status
  tapEvent(e) {
    if (this.idleProvider.status === "idle") {
      this.idleProvider.reset();
    }
  }

  select(type) {
    type.selected = !type.selected;

    if (type.selected) {
      this.selectedType.push(type.name);
    } else {
      var index = this.selectedType.indexOf(type.name);
      if (index > -1) {
        this.selectedType.splice(index, 1);
      }
    }

    this.events.publish("filter:update", this.selectedType);

    console.log(this.selectedType);

  }
}
