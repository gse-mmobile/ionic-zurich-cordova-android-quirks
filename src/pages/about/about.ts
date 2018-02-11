import { Component } from '@angular/core';

import {Camera, CameraOptions, CameraPopoverOptions} from '@ionic-native/camera';
import {SplashScreen} from '@ionic-native/splash-screen';
import {QuirksService} from '../../providers/quirks-service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  imgURI: string;

  anotherValue: string;

  constructor(private camera: Camera, private splashScreen: SplashScreen, private quirksService: QuirksService) {

  }

  ionViewDidEnter() {
    this.splashScreen.hide();
  }

  ionViewWillEnter() {
    if (this.quirksService.pendingResult) {
      this.imgURI = this.wkWebViewFileURI(this.quirksService.pendingResult);
    }
  }

  open() {
    this.getPicture(this.camera.PictureSourceType.CAMERA);
  }

  private getPicture(sourceType: number) {

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
      sourceType: sourceType,
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
