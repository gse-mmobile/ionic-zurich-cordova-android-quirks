import { Component } from '@angular/core';
import {SplashScreen} from '@ionic-native/splash-screen';
import {QuirksService} from '../../providers/quirks-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private splashScreen: SplashScreen, private quirksService: QuirksService) {

  }

  ionViewDidEnter() {
    if (!this.quirksService.processingQuirks) {
      this.splashScreen.hide();
    }
  }

}
