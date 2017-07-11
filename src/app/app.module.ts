import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { IdleProvider } from '../providers/idle/idle';
import { HomePage } from '../pages/home/home';
import { MainPage } from '../pages/main/main';
import { WinesPage } from '../pages/wines/wines';
import { UnitPopupPage } from '../pages/wines/unit-popup/unit-popup';

import { QuantityPopupPage } from '../pages/quotations/quantity-popup/quantity-popup';
import { SettingPage } from '../pages/setting/setting';
import { SearchPage } from '../pages/search/search';
import { ConfirmPage } from '../pages/confirm/confirm';
import { Keyboard } from '@ionic-native/keyboard';
import { WineService } from '../providers/wine-service/wine-service';
import { QuotationsPage } from '../pages/quotations/quotations';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MainPage,
    WinesPage,
    UnitPopupPage,
    SettingPage,
    SearchPage,
    ConfirmPage,
    QuantityPopupPage,
    QuotationsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgIdleKeepaliveModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MainPage,
    WinesPage,
    UnitPopupPage,
    SettingPage,
    SearchPage,
    ConfirmPage,
    QuantityPopupPage,
    QuotationsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    ScreenOrientation,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    IdleProvider,
    WineService
  ]
})
export class AppModule { }
