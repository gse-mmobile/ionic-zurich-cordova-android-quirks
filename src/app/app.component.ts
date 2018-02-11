import { Component } from '@angular/core';
import {App, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { TabsPage } from '../pages/tabs/tabs';
import {QuirksService} from '../providers/quirks-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  constructor(private app: App, platform: Platform, statusBar: StatusBar, private quirksService: QuirksService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();

      this.app.getRootNav().setRoot(TabsPage, {tabIndex: this.quirksService.pendingResult && this.quirksService.pendingResult !== '' ? 1 : 0});
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
