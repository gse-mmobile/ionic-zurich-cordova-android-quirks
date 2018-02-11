import { Component } from '@angular/core';
import {SplashScreen} from '@ionic-native/splash-screen';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private splashScreen: SplashScreen) {

  }

  ionViewDidEnter() {
    this.splashScreen.hide();
  }

}
