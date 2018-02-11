import { Component } from '@angular/core';

import {Camera, CameraOptions, CameraPopoverOptions} from '@ionic-native/camera';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  imgURI: string;

  constructor(private camera: Camera) {

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
