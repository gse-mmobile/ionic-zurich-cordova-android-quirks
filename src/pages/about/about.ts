import { Component } from '@angular/core';

import {Camera, CameraOptions, CameraPopoverOptions} from '@ionic-native/camera';
import {SplashScreen} from '@ionic-native/splash-screen';
import {QuirksService} from '../../providers/quirks-service';
import {Platform} from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  imgURI: string;

  anotherValue: string;

  constructor(private platform: Platform, private camera: Camera, private splashScreen: SplashScreen, private quirksService: QuirksService) {

  }

  ionViewDidEnter() {
    this.splashScreen.hide();
  }

  ionViewWillEnter() {
    if (this.quirksService.pendingResult) {
      this.imgURI = this.wkWebViewFileURI(this.quirksService.pendingResult);

      this.quirksService.getStateRecovery().then((result: string) => {
        this.anotherValue = result;

        this.quirksService.removeStateRecovery().then(() => {
          // Cool
        });
      });
    }
  }

  open() {
    this.saveForRecovery().then(() => {
      this.takePhoto();
    });
  }

  private saveForRecovery(): Promise<{}> {
    return new Promise((resolve) => {
      if (this.platform.is('android')) {
        this.quirksService.saveStateRecovery(this.anotherValue).then(() => {
          resolve();
        });
      } else {
        resolve();
      }
    });
  }

  private takePhoto() {
    //noinspection TypeScriptUnresolvedVariable
    let popoverOptions: CameraPopoverOptions = {
      x: 0,
      y: 0,
      width: 1080,
      height: 1080,
      arrowDir: this.camera.PopoverArrowDirection.ARROW_ANY
    };

    let options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: false,
      cameraDirection: this.camera.Direction.BACK,
      popoverOptions: popoverOptions
    };

    this.camera.getPicture(options).then((imageURI: string) => {
      this.imgURI = this.wkWebViewFileURI(imageURI);
    }, (err: string) => {
      console.error(err);
    });
  }

  private wkWebViewFileURI(uri: string): string {
    if (uri !== null && uri.indexOf('file://') > -1) {
      uri = uri.replace('file://', '');
    }

    return uri;
  }

}
