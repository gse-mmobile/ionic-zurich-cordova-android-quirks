import { Component } from '@angular/core';
import {Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { TabsPage } from '../pages/tabs/tabs';
import {QuirksService} from '../providers/quirks-service';
import {TabsService} from '../providers/tabs-service';
import {SplashScreen} from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, private splashScreen: SplashScreen, statusBar: StatusBar, private quirksService: QuirksService, private tabsService: TabsService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();

      if (this.quirksService.pendingResult) {
        this.tabsService.switchToTab(1);
      } else {
        this.splashScreen.hide();
      }
    });

    if (platform.is('android')) {
      platform.resume.subscribe((event:any) => {
        this.handleAndroidCameraRestart(event)
      });
    }

  }

  private handleAndroidCameraRestart(event: any) {

    if (event && event.pendingResult) {

      // We don't check the status but in a real app you would need to test if event.pendingResult.pluginStatus === 'OK'
      // For demo purpose, we ignore that

      if ('Camera' === event.pendingResult.pluginServiceName && event.pendingResult.result) {
        this.quirksService.pendingResult = event.pendingResult.result;
      }
    }
  }
}
